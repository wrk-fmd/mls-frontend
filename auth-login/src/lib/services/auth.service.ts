import {HttpErrorResponse} from '@angular/common/http';
import {Injectable, OnDestroy} from '@angular/core';

import {AuthenticationEndpointService, AuthResponseDto} from 'mls-auth-api';

import {NGXLogger} from 'ngx-logger';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';

import {TokenService} from './token.service';
import {User} from './user';

/**
 * This service provides methods for login and logout and hides token renewal from the application
 */
@Injectable()
export class AuthService implements OnDestroy {

  private readonly tokenChanges: Subscription;
  readonly user: BehaviorSubject<User>;
  private renewalTimeout?;

  constructor(private readonly endpoint: AuthenticationEndpointService,
              private readonly tokenService: TokenService,
              private readonly logger: NGXLogger) {
    this.user = new BehaviorSubject<User>(null);
    this.tokenChanges = this.tokenService.renewalToken.subscribe(token => this.updateRenewalToken(token));
  }

  ngOnDestroy(): void {
    this.tokenChanges.unsubscribe();
    this.user.next(null);
    this.cancelRenewal();
  }

  /**
   * Login using the given credentials
   * @return An observable containing the response
   */
  login(username: string, password: string): Observable<AuthResponseDto> {
    return this.endpoint.authenticate({username, password}).pipe(
        tap(response => this.tokenService.setRenewalToken(response.token))
    );
  }

  /**
   * Logout the currently active user
   */
  logout() {
    this.cancelRenewal();
    this.tokenService.removeRenewalToken();
  }

  /**
   * Renew the authentication token
   */
  private renewRequestToken() {
    // Clear any existing timeouts for renewal
    this.cancelRenewal();

    // Send renewal request
    this.logger.info('[AuthService] Renewing authentication token');
    this.endpoint.getRequestToken().subscribe(
        response => this.updateRequestToken(response.token),
        (error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) {
            // Server rejected the request with an authorization failure, consider this as invalid token and logout
            this.logger.error('[AuthService] Authorization failure on token renewal:', error);
            this.logout();
          } else {
            // Some other error happened on renewal, try again immediately
            this.logger.error('[AuthService] Error renewing authentication token:', error);
            this.scheduleRenewal(0);
          }
        }
    );
  }

  /**
   * Called whenever the renewal token has changed in the TokenService
   * @param token The new renewal token
   */
  private updateRenewalToken(token: string) {
    this.logger.debug('[AuthService] Renewal token update received:', token);

    if (!token) {
      // No token set in TokenService
      this.cancelRenewal();
      this.user.next(null);
      return;
    }

    const decoded = this.decodeToken(token);
    if (!decoded) {
      // Token decoding failed, trigger logout logic
      this.logout();
      return;
    }

    const now = Date.now() / 1000;
    if (decoded.exp && decoded.exp < now) {
      // Expired token, trigger logout logic
      this.logger.warn('[AuthService] Encountered invalid token:', decoded);
      this.logout();
      return;
    }

    // Trigger loading of renewal token
    this.scheduleRenewal(0);
  }

  /**
   * Called whenever a new request token has been received
   * @param token The new request token
   */
  private updateRequestToken(token: string) {
    this.logger.debug('[AuthService] Request token update received:', token);

    const decoded = this.decodeToken(token);
    if (!decoded) {
      // Token decoding failed, try to get a new one
      this.scheduleRenewal(0);
      return;
    }

    // Store token in TokenService
    this.tokenService.setRequestToken(token);

    // Set status to logged in
    this.user.next({username: decoded.sub, roles: decoded.authorities});

    // Schedule renewal
    const now = Date.now() / 1000;
    this.scheduleRenewal(decoded.exp - now);
  }

  /**
   * Helper to retrieve a JWT's body
   * @param token The encoded JWT
   * @return The JWT payload, or null if it could not be parsed
   */
  private decodeToken(token: string): any {
    if (!token) {
      return null;
    }

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      this.logger.error(`[AuthService] JWT should have exactly 3 components, but received ${token}`);
      return null;
    }

    const decoded = atob(tokenParts[1]);
    if (!decoded) {
      this.logger.error(`[AuthService] Decoding JWT ${token} failed`);
    }

    return JSON.parse(decoded);
  }

  /**
   * Schedule the renewal of the token
   * @param expiration The time until token expires (in seconds)
   */
  private scheduleRenewal(expiration: number) {
    // Cancel any existing scheduled renewals
    this.cancelRenewal();

    // Renew the token 60s before it expires
    let renewIn = expiration - 60;

    if (renewIn < 0) {
      // Token should have been renewed already, do it now
      renewIn = 0;
    }

    this.logger.debug(`[AuthService] Scheduling to renew token in ${renewIn} seconds`);
    this.renewalTimeout = setTimeout(() => this.renewRequestToken(), renewIn * 1000);
  }

  /**
   * Cancel the existing timeout for renewal
   */
  private cancelRenewal() {
    if (this.renewalTimeout) {
      this.logger.debug('[AuthService] Clearing authentication renewal timeout');
      clearTimeout(this.renewalTimeout);
      this.renewalTimeout = null;
    }
  }
}

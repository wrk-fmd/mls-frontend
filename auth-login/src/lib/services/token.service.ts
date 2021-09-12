import {Injectable, OnDestroy} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {BehaviorSubject} from 'rxjs';

/**
 * This service provides a high level interface to store and retrieve authentication tokens in LocalStorage
 */
@Injectable()
export class TokenService implements OnDestroy {
  private readonly key: string = 'mls-token';

  private readonly storageChanges: (event: StorageEvent) => void;
  readonly renewalToken: BehaviorSubject<string | null>;
  readonly requestToken: BehaviorSubject<string | null>;

  constructor(private logger: NGXLogger) {
    // Read existing token from LocalStorage
    const existingToken = localStorage.getItem(this.key) || null;
    this.renewalToken = new BehaviorSubject<string | null>(existingToken);
    this.requestToken = new BehaviorSubject<string | null>(null);

    // Listen to changes in LocalStorage
    this.storageChanges = event => this.updateFromLocalStorage(event);
    window.addEventListener('storage', this.storageChanges);
  }

  ngOnDestroy(): void {
    // Stop listening for changes in LocalStorage
    window.removeEventListener('storage', this.storageChanges);
  }

  /**
   * Handle updates in LocalStorage
   * @param event The event data
   */
  private updateFromLocalStorage(event: StorageEvent) {
    if (event.storageArea === localStorage && event.key === this.key) {
      this.logger.debug('[TokenService] Renewal token updated in LocalStorage');
      this.setRenewalToken(event.newValue);
    }
  }

  /**
   * Set the new token value
   * @param token The token, or null to unset the token
   */
  setRenewalToken(token: string | null) {
    token = token || null;
    if (this.renewalToken.value !== token) {
      this.logger.debug(`[TokenService] Updating renewal token to ${token}`);
      this.renewalToken.next(token);
      this.store(token);
    }
  }

  /**
   * Remove the token value (i.e., set it to null)
   */
  removeRenewalToken() {
    this.logger.debug('[TokenService] Removing renewal token');
    this.setRenewalToken(null);
  }

  /**
   * Return the current token value
   * @return The token string, or null if none is set
   */
  getRenewalToken(): string | null {
    return this.renewalToken.value;
  }

  setRequestToken(token?: string) {
    this.requestToken.next(token || null);
  }

  /**
   * Return the current request token
   */
  getRequestToken(): string | null {
    return this.requestToken.value;
  }

  /**
   * Store the token value in LocalStorage
   * @param token The token value (or null to unset)
   */
  private store(token: string | null) {
    if (token) {
      localStorage.setItem(this.key, token);
    } else {
      localStorage.removeItem(this.key);
    }
  }
}

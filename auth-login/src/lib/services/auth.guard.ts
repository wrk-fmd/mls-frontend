import {Injectable, OnDestroy} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {NGXLogger} from 'ngx-logger';
import {Subscription} from 'rxjs';
import {AuthService} from './auth.service';
import {User} from './user';

/**
 * This guard checks if a user is logged in and redirects if necessary
 */
@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {

  private readonly authChanges: Subscription;

  constructor(private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly authService: AuthService,
              private readonly logger: NGXLogger) {
    // Listen to changes in login status
    this.authChanges = this.authService.user.subscribe(user => this.loginEvent(user));
  }

  ngOnDestroy(): void {
    this.authChanges.unsubscribe();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url.startsWith('/login')) {
      this.logger.debug('[AuthGuard] On login page, authentication not necessary');
      if (this.authService.user.value) {
        // Login selected, redirect away if already authenticated
        this.redirectToPage(state);
      }
      return true;
    }

    this.logger.debug('[AuthGuard] Checking authentication');
    if (this.authService.user.value) {
      this.logger.debug('[AuthGuard] User is authenticated');
      return true;
    }

    this.redirectToLogin(state);
    return false;
  }

  /**
   * Triggered after the login status has changed
   */
  private loginEvent(user: User) {
    this.logger.debug('[AuthGuard] Received logged in user:', user);

    const onLoginPage = this.router.isActive('/login', false);

    if (user && onLoginPage) {
      // Redirect away from login page
      this.redirectToPage(this.router.routerState.snapshot);
    } else if (!user && !onLoginPage) {
      // Redirect to login page if not already there
      this.redirectToLogin(this.router.routerState.snapshot);
    }
  }

  private redirectToLogin(route: RouterStateSnapshot) {
    this.logger.info('[AuthGuard] No user authenticated, redirecting to login page');
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/login'], {queryParams: {returnUrl: route.url}});
  }

  private redirectToPage(route: RouterStateSnapshot) {
    const target = route.root.queryParams.returnUrl || '/';
    this.logger.info('[AuthGuard] Redirecting to ', target);

    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([target]);
  }
}

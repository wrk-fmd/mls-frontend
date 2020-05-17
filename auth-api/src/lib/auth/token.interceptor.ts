import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TokenService} from './token.service';

/**
 * This class intercepts HTTP requests and sets the current authentication token (if any)
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly tokenService: TokenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getToken(request);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }

  private getToken(request: HttpRequest<any>): string {
    return request.method === 'GET' && request.url.endsWith('/authentication')
        ? this.tokenService.getRenewalToken()
        : this.tokenService.getRequestToken();
  }
}

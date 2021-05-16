import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../admin/shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      const token = this.auth.token ?? '';
      req = req.clone({
        setParams: {
          auth: token,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('[Interceptor Error]');
        if (err.status === 401) {
          this.auth.logout();
          this.router.navigate(['/admin', '/login']);
        }

        return throwError(err);
      })
    );
  }
}

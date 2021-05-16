import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { catchError, tap } from 'rxjs/operators';
export interface ErrorResponce {
  message: string;
  code: number;
}

@Injectable({providedIn:'root'})
export class AuthService {
  constructor() {}

  public error$: Subject<string> = new Subject<string>();
  get token() {
    const token = localStorage.getItem('authToken');
    const expStr: string | null = localStorage.getItem('authToken-exp');
    if (!token || !expStr) {
      this.logout();
      return null;
    }

    const expDate = new Date(expStr),
      currentDate = new Date();

    if (currentDate > expDate) {
      this.logout();
      return null;
    }
    return token;
  }

  private setToken(value: string | null) {
    if (!value) {
      localStorage.removeItem('authToken');
    }
    const expDate = new Date().setHours(48);
    localStorage.setItem('authToken', String(value));
    localStorage.setItem('authToken-exp', expDate.toString());
  }

  login(user: User): Observable<any> {
    const p = new Observable((obs) => {
      if (user.email.includes('zeone@bigmir.net')) {
        const err: ErrorResponce = {
          code: 401,
          message: '',
        };
        switch (user.email) {
          case 'zeone@bigmir.net':
            err.message = 'wrong_email';
            break;

          case 'zeone@bigmir.net2':
            err.message = 'wrong_password';
            break;
          case 'zeone@bigmir.net3':
            err.message = 'email_not_found';
            break;
        }
        //throwError(err);
        obs.error(err);
      }
      //  this.setToken('auth');
      obs.next(null);
    }).pipe(
      tap(() => this.setToken('Auth')),
      catchError(this.handleError.bind(this))
    );
    return p;
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authToken-exp');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: ErrorResponce) {
    const { message } = error;
    console.log(message);

    switch (message) {
      case 'wrong_password':
        this.error$.next('Wrong Password');
        break;

      case 'wrong_email':
        this.error$.next('Wrong Email');
        break;
      case 'email_not_found':
        this.error$.next('Email not Exist ');
        break;
    }
    return throwError(error);
  }
}

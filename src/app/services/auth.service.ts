import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from '../models/auth-request';
import { tap } from 'rxjs/operators';
import { JwtResponse } from '../models/jwt-response';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class AuthService {

  static KEY = 'jwt';

  isLoginSubject: BehaviorSubject<boolean>;
  apiPath: string;

  constructor(private http: HttpClient) {
    this.isLoginSubject = new BehaviorSubject<boolean>(this.hasTokenInStorage());
    this.apiPath = window.location.origin + '/api/auth/login'
  }

  login(authRequest: AuthRequest) {
    return this.http.post<JwtResponse>(this.apiPath, authRequest).pipe(
      tap(jwt => {
        localStorage.setItem(AuthService.KEY, jwt.value);
        this.isLoginSubject.next(true);
      })
    );
  }

  isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  logout() {
    localStorage.removeItem(AuthService.KEY);
    this.isLoginSubject.next(false);
  }

  private hasTokenInStorage() {
    return localStorage.getItem(AuthService.KEY) !== null;
  }

}

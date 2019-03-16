import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from '../models/auth-request';
import { tap } from 'rxjs/operators';
import { JwtResponse } from '../models/jwt-response';
import {BehaviorSubject, Observable} from 'rxjs';
import {JWTClaims} from '../models/jwt-claims';
import {Role} from '../models/role';

@Injectable()
export class AuthService {

  static KEY = 'jwt';

  private isLoggedInAdminSubject: BehaviorSubject<boolean>;
  private isLoginSubject: BehaviorSubject<boolean>;
  private apiPath: string;

  constructor(private http: HttpClient) {
    this.apiPath = window.location.origin + '/api/auth/login';

    if (this.hasTokenInStorage()) {
      this.isLoginSubject = new BehaviorSubject<boolean>(true);
      this.isLoggedInAdminSubject = new BehaviorSubject<boolean>(this.isAdmin(this.getClaimsFromStorage()));
    } else {
      this.isLoginSubject = new BehaviorSubject<boolean>(false);
      this.isLoggedInAdminSubject = new BehaviorSubject<boolean>(false);
    }
  }

  login(authRequest: AuthRequest) {
    return this.http.post<JwtResponse>(this.apiPath, authRequest).pipe(
      tap(jwt => {
        localStorage.setItem(AuthService.KEY, jwt.value);
        this.isLoginSubject.next(true);
        this.isLoggedInAdminSubject.next(this.isAdmin(this.getClaimsFromJWT(jwt.value)));
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  isLoggedInAdmin(): Observable<boolean> {
    return this.isLoggedInAdminSubject.asObservable();
  }

  logout() {
    localStorage.removeItem(AuthService.KEY);
    this.isLoginSubject.next(false);
    this.isLoggedInAdminSubject.next(false);
  }

  private hasTokenInStorage() {
    return localStorage.getItem(AuthService.KEY) !== null;
  }

  private isAdmin(claims: JWTClaims): boolean {
    return claims.role === Role.ROLE_ADMIN;
  }

  private getClaimsFromStorage(): JWTClaims {
    return this.getClaimsFromJWT(localStorage.getItem(AuthService.KEY));
  }

  private getClaimsFromJWT(jwt: string): JWTClaims {
    const parts = jwt.split('.');
    if (parts.length < 3) { throw Error('Malformed JWT!'); }

    return JSON.parse(atob(parts[1]));
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {delay, flatMap, tap} from 'rxjs/operators';
import { AccountService } from '../../services/account.service';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {StatusMessage} from '../../models/status-message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoggedIn: Observable<boolean>;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  status: StatusMessage;

  constructor(private authService: AuthService,
              private router: Router) {
    this.authService.logout();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onSubmit() {
    this.authService.login({
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }).pipe(
      tap(() => this.status = {
        message: 'Successfully logged in',
        isError: false
      }),
      delay(1000),
      tap(() => this.status.message += '.'),
      delay(1000),
      tap(() => this.status.message += '.'),
      delay(1000),
      tap(() => this.status.message += '.'),
      delay(1000)
    ).subscribe(
      () => this.router.navigate(['home']),
      (error) => this.status = {
        message: error.error.status === 403 ? 'Username or password is wrong' : error.error.message,
        isError: true
      }
    );
  }


}

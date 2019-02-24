import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { flatMap } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';
import { Observable } from 'rxjs';

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

  constructor(private authService: AuthService,
              private accountService: AccountService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onSubmit() {
    this.authService.login({
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }).pipe(
      flatMap((thing) => {
        return this.accountService.getAccount(this.loginForm.get('username').value)
      })
    ).subscribe(
      success => console.log(success),
      error => console.log(error)
    );
  }


}

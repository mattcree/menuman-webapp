import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';
import {StatusMessage} from '../../models/status-message';
import {delay, tap} from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  minimumFormFieldLength = 8;

  status: StatusMessage;

  signUpForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minimumFormFieldLength),
      Validators.pattern('^[a-zA-Z][a-zA-Z_]+[a-zA-Z]$')
    ]),
    password: new FormControl('', [
      Validators.required, Validators.minLength(this.minimumFormFieldLength)
    ]),
    address: new FormControl('', [
      Validators.required, Validators.minLength(this.minimumFormFieldLength)
    ])
  });

  constructor(private accountService: AccountService, private router: Router) { }

  onSubmit() {
    this.accountService.createAccount({
      username: this.signUpForm.get('username').value,
      password: this.signUpForm.get('password').value,
      address: this.signUpForm.get('address').value
    }).pipe(
      tap(() => this.status = {
        message: 'Account created!  Redirecting to login',
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
      () => this.router.navigate(['login']),
      (error) => this.status = {
        message: error.error.message, isError: true
      }
    );
  }

  get username() {
    console.log(this.signUpForm.get('username'))
    return this.signUpForm.get('username');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get address() {
    return this.signUpForm.get('address');
  }

}

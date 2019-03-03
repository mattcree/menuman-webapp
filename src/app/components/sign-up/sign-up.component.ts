import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    address: new FormControl('')
  });

  constructor(private accountService: AccountService, private router: Router) { }

  onSubmit() {
    this.accountService.createAccount({
      username: this.signUpForm.get('username').value,
      password: this.signUpForm.get('password').value,
      address: this.signUpForm.get('address').value
    }).subscribe(
      () => this.router.navigate(['login'])
    );
  }

}

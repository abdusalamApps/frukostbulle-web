import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  title = 'Inloggning';
  email = '';
  enteredPassword = '';
  hide = true;

  signup = false;

  constructor(public location: Location) {}

  ngOnInit(): void {}

  signIn() {}

  // popup to choose what kind of user is to register
  onSignup() {}
}

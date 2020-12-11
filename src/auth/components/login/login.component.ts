import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as fromStore from '../../../seller/state';
import { Store } from '@ngrx/store';

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

  constructor(
    public location: Location,
    private store: Store<fromStore.SellerState>
  ) {}

  ngOnInit(): void {}

  signIn() {
    this.store.dispatch(
      new fromStore.Login({ email: this.email, password: this.enteredPassword })
    );
  }

  onSignup() {}
}

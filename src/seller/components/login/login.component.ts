import { LoginInfo } from './../../../models/loginInfo.model';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as fromStore from '../../state';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  title = 'Inloggning';
  public loginInfo: LoginInfo = { email: '', password: '' };
  hide = true;

  signup = false;

  pending$ = new Observable();

  constructor(
    public location: Location,
    private store: Store<fromStore.SellerState>
  ) {}

  ngOnInit(): void {
    this.pending$ = this.store.select(fromStore.getPending);
  }

  signIn() {
    this.store.dispatch(new fromStore.Login(this.loginInfo));
  }
  onSignup() {}
}

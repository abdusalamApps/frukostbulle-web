import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../../app/state';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';
import {LoginInfo} from '../../../models/loginInfo.model';
import {Observable} from 'rxjs';
import * as fromStore from '../../state';

@Component({
  selector: 'app-order-login-or-not',
  templateUrl: './order-login-or-not.component.html',
  styleUrls: ['./order-login-or-not.component.scss']
})
export class OrderLoginOrNotComponent implements OnInit {
  title = 'Beställning';

  public loginInfo: LoginInfo = {email: '', password: ''};
  hide = true;

  signup = false;

  pending$ = new Observable();

  email = '';
  password = '';
  constructor(private store: Store<fromState.BuyerState>) {}
  ngOnInit(): void {
  }
  public login(): void {
  }

  public navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }
  signIn(): void {
    this.loginInfo = {email: this.email, password: this.password};
    this.store.dispatch(new fromStore.BuyerLogin(this.loginInfo));
  }
}

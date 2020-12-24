import {LoginInfo} from '../../../models/loginInfo.model';
import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import * as fromStore from 'src/buyer/state';
import * as fromRoot from 'src/app/state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Inloggning';
  public loginInfo: LoginInfo = {email: '', password: ''};
  hide = true;

  signup = false;

  pending$ = new Observable();

  email = '';
  password = '';

  constructor(
    public location: Location,
    private store: Store<fromStore.BuyerState>
  ) {
  }

  ngOnInit(): void {
    this.pending$ = this.store.select(fromStore.getBuyerLoginPending);
  }

  signIn(): void {
    this.loginInfo = {email: this.email, password: this.password};
    this.store.dispatch(new fromStore.BuyerLogin(this.loginInfo));
  }

  navigateHome(): void {
    this.store.dispatch(new fromRoot.Go({path: [''], extras: {replaceUrl: true}}));
  }


}

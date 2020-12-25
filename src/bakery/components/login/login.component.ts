import { Component, OnInit } from '@angular/core';
import * as fromRoot from 'src/app/state';
import {Store} from '@ngrx/store';
import * as fromStore from 'src/bakery/state';
import {LoginInfo} from '../../../models/loginInfo.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Välkommen';

  public loginInfo: LoginInfo = {email: '', password: ''};
  hide = true;

  signup = false;

  pending$ = new Observable();

  email = '';
  password = '';
  constructor(private store: Store<fromStore.BakeryState>) {}

  ngOnInit(): void {
    this.pending$ = this.store.select(fromStore.getPending);
  }

  signIn(): void {
    this.loginInfo = {email: this.email, password: this.password};
    this.store.dispatch(new fromStore.Login(this.loginInfo));
  }

  navigateHome(): void {
    this.store.dispatch(new fromRoot.Go({path: [''], extras: {replaceUrl: true}}));
  }
}

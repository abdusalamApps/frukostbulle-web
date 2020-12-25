import {Component, OnInit} from '@angular/core';
import {LoginInfo} from '../../../models/loginInfo.model';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromStore from '../../../admin/state';
import * as fromRoot from '../../../app/state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Admin login';
  public loginInfo: LoginInfo = {email: '', password: ''};
  hide = true;

  signup = false;

  pending$ = new Observable();

  email = '';
  password = '';

  constructor(private store: Store<fromStore.AdminState>) {}

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

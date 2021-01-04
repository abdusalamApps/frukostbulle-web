import {LoginInfo} from '../../../models/loginInfo.model';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import * as fromStore from 'src/buyer/state';
import * as fromRoot from 'src/app/state';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {UsersService} from '../../../seller/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  title = 'Inloggning';
  public loginInfo: LoginInfo = {email: '', password: ''};
  hide = true;

  signup = false;

  pending$ = new Observable();

  email = '';
  password = '';

  code = -1;

  confirmSubscription$ = new Subscription();

  constructor(private store: Store<fromStore.BuyerState>,
              private userService: UsersService) {
  }

  ngOnInit(): void {
    this.pending$ = this.store.select(fromStore.getBuyerLoginPending);
  }

  ngOnDestroy(): void {
    this.confirmSubscription$.unsubscribe();
  }

  signIn(): void {
    this.loginInfo = {email: this.email, password: this.password};
    this.store.dispatch(new fromStore.BuyerLogin(this.loginInfo));
  }

  navigateHome(): void {
    this.store.dispatch(new fromRoot.Go({path: [''], extras: {replaceUrl: true}}));
  }

  onConfirm(): void {
    this.confirmSubscription$ = this.userService.confirmAccount(this.email, this.code).subscribe(
      res => console.log(`accountConfirm res: ${res}`),
      err => console.log(`accountConfirm error: ${JSON.stringify(err)}`)
    );
    // this.store.dispatch(new fromRoot.Back());

  }


}

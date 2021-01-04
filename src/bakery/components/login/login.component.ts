import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromRoot from 'src/app/state';
import {Store} from '@ngrx/store';
import * as fromStore from 'src/bakery/state';
import {LoginInfo} from '../../../models/loginInfo.model';
import {Observable, Subscription} from 'rxjs';
import {UsersService} from '../../../seller/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  title = 'Välkommen';

  code = -1;

  public loginInfo: LoginInfo = {email: '', password: ''};
  hide = true;

  signup = false;

  pending$ = new Observable();
  confirmSubscription$ = new Subscription();
  userSubscription$ = new Subscription();

  email = '';
  password = '';

  constructor(private store: Store<fromStore.BakeryState>,
              private userService: UsersService,
  ) {
  }

  ngOnInit(): void {
    this.pending$ = this.store.select(fromStore.getPending);
  }

  ngOnDestroy(): void {
    this.confirmSubscription$.unsubscribe();
    this.userSubscription$.unsubscribe();
  }

  signIn(): void {
    this.loginInfo = {email: this.email, password: this.password};
    this.store.dispatch(new fromStore.LoginBakery(this.loginInfo));
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

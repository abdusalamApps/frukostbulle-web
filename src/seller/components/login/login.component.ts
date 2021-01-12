import {LoginInfo} from '../../../models/loginInfo.model';
import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromStore from '../../state';
import * as fromRoot from 'src/app/state';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {UsersService} from '../../services/users.service';

// @ts-ignore
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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

  constructor(
    private store: Store<fromStore.SellerState>,
    private userService: UsersService
  ) {
  }

  // gets the pending state to show loading indicator
  ngOnInit(): void {
    this.pending$ = this.store.select(fromStore.getPending);
  }

  // unsubscribes the this.confirmSubscription$
  // when this components is destroyed to prevent performance leaks
  ngOnDestroy(): void {
    this.confirmSubscription$.unsubscribe();
  }

  // signs in the user when sign in button is clicked
  signIn() {
    this.loginInfo = {email: this.email, password: this.password};
    this.store.dispatch(new fromStore.Login(this.loginInfo));
  }

  onSignup() {
  }

  navigateHome() {
    this.store.dispatch(new fromRoot.Go({path: [''], extras: {replaceUrl: true}}));
  }

  // calls the confirmAccount on the userService when confirm button clicked
  onConfirm(): void {
    this.confirmSubscription$ = this.userService.confirmAccount(this.email, this.code).subscribe(
      res => console.log(`accountConfirm res: ${res}`),
      err => console.log(`accountConfirm error: ${JSON.stringify(err)}`)
    );
    // this.store.dispatch(new fromRoot.Back());

  }

}

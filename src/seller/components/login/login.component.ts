import {LoginInfo} from '../../../models/loginInfo.model';
import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromStore from '../../state';
import * as fromRoot from 'src/app/state';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {UsersService} from '../../services/users.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  cEmailSubscription = new Subscription();
  getUserSubscription = new Subscription();

  constructor(
    private store: Store<fromStore.SellerState>,
    private userService: UsersService,
    private snackBar: MatSnackBar
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
    this.cEmailSubscription.unsubscribe();
    this.getUserSubscription.unsubscribe();
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

  // calls confirmAccount() on userService when confirm button is clicked
  onConfirm(): void {
    this.confirmSubscription$ = this.userService.confirmAccount(this.email, this.code).subscribe(
      res => {
        if (res) {
          this.snackBar.open('Din e-post är nu bekräftad! Vänta på att admin ska aktivera din profil', 'Ok',
            {duration: 2000});
        } else {
          this.snackBar.open('Din e-post var redan bekräftad eller den finns inte!', 'Ok',
            {duration: 2000});
        }
        console.log(`accountConfirm res: ${res}`);
      },
      err => {
        this.snackBar.open('Nåt fel inträffade!', 'Ok',
          {duration: 2000});
        console.log(`accountConfirm error: ${JSON.stringify(err)}`);
      }
    );
    // this.store.dispatch(new fromRoot.Back());

  }

  onSendCode() {
    this.getUserSubscription = this.userService.getUserByEmail(this.email).subscribe(
      res => {
        if (res.active) {
          this.snackBar.open('Din profil är redan aktiverad!', 'Ok',
            {duration: 2000});
        } else {
          this.cEmailSubscription = this.userService.sendConfirmationEmail(this.email).subscribe(
            res => {
              if (res) {
                this.snackBar.open('Kod har skickats till angivna e-post', 'ok',
                  {duration: 2000});
              } else {
                this.snackBar.open('Din e-post är redan bekräftad. Vänta på att admin ska aktivera din profil', 'ok',
                  {duration: 4000});
              }
              console.log(`createUser res: ${res}`);
            },
          );
        }
      },
      error => {
        this.snackBar.open('Nåt fel inträffade!', 'Ok',
          {duration: 2000});
      }
    );
  }

}

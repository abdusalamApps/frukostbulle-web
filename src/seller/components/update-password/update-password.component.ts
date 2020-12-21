import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromRoot from 'src/app/state';
import * as fromState from '../../state';
import {PasswordService} from '../../services/password.service';
import {catchError, map, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {of, Subscription} from 'rxjs';


@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {

  title = 'Uppdatera ditt lösenord';

  currentPassword = '';
  newPassword = '';
  newPassword2 = '';

  hideCurrent = true;

  hide = true;

  checkPassWordSubscription$: Subscription = new Subscription();
  updatePassWordSubscription$: Subscription = new Subscription();

  constructor(private store: Store<fromState.SellerState>,
              private passwordService: PasswordService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }

  confirm(): void {
    if (this.currentPassword === '' || this.newPassword === '' || this.newPassword2 === '') {
      this.snackBar.open('Fälten kan inte vara tomma', 'Ok', {duration: 2000});
    } else if (this.newPassword !== this.newPassword2) {
      this.snackBar.open('Lösenorden matchar inte', 'Ok', {duration: 2000});
    } else {
      const userid = localStorage.getItem('currentUserId');
      if (userid) {
        this.checkPassWordSubscription$ = this.passwordService.checkPassword(
          {userId: parseInt(userid, 10), password: this.currentPassword})
          .subscribe(
            res => {
              console.log(`res ${res}`);
              if (res) {
                this.passwordService.updatePassword(
                  {userId: parseInt(userid, 10), password: this.newPassword}
                ).subscribe(
                  result => {
                    console.log(`updatePassword result: ${result}`);
                    this.store.dispatch(new fromRoot.Back());
                  },
                  error => console.log(`updatePassword error: ${error}`)
                );
              } else {
                this.snackBar.open('Nuvarande lösenord fel', 'Ok', {duration: 2000});
              }
            },
            catchError((error: any) => {
              this.snackBar.open(`Systemfel ${error}, förösök igen senare`,
                'Ok', {duration: 2000});
              return of(false);
            })
          );
      }
    }

  }

  ngOnDestroy(): void {
    this.checkPassWordSubscription$.unsubscribe();
    this.updatePassWordSubscription$.unsubscribe();
  }


}

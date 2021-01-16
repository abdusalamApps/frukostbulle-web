import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {of, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromState from '../../../admin/state';
import {PasswordService} from '../../../seller/services/password.service';
import * as fromRoot from '../../../app/state';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit, OnDestroy{
  title = 'Hantera adminprofil';
  hide = true;
  hide1 = true;

  currentPassword = '';

  enteredPassword = '';
  enteredPassword2 = '';

  checkPassWordSubscription$: Subscription = new Subscription();
  updatePassWordSubscription$: Subscription = new Subscription();

  constructor(private snackBar: MatSnackBar,
              private store: Store<fromState.AdminState>,
              private passwordService: PasswordService) {
  }

  ngOnInit(): void {
  }

  updatePassword(): void {
    if (this.currentPassword === '' || this.enteredPassword === '' || this.enteredPassword2 === '') {
      this.snackBar.open('Fälten kan inte vara tomma', 'Ok', {duration: 2000});
    } else if (this.enteredPassword !== this.enteredPassword2) {
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
                  {userId: parseInt(userid, 10), password: this.enteredPassword}
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
              this.snackBar.open(`Systemfel ${error}, försök igen senare`,
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

  onLogout(): void {
    this.store.dispatch(new fromState.Logout());
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as fromRoot from '../../state';
import {Store} from '@ngrx/store';
import * as fromStore from '../../../admin/state';
import {PasswordService} from '../../../seller/services/password.service';
import {FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],

})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  title = 'Lösenord återställning';

  emailControl = new FormControl('', [
    Validators.email,
    Validators.required,
  ]);

  confirm = false;
  code = -1;

  resetSubscription = new Subscription();
  confirmSubscription = new Subscription();

  constructor(private snackBar: MatSnackBar,
              private store: Store<fromStore.AdminState>,
              private passwordService: PasswordService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.resetSubscription.unsubscribe();
    this.confirmSubscription.unsubscribe();
  }

  sendResetRequest(): void {
    if (this.emailControl.hasError('required')
      || this.emailControl.hasError('email')) {

      this.snackBar.open('Rätta email.', 'Ok', {
        duration: 2000,
      });

    } else {
      console.log(this.emailControl.value);
      this.resetSubscription = this.passwordService.requestNewPassword(this.emailControl.value).subscribe(
        res => {
          console.log(`reset success ${res}`);
          this.confirm = true;
          this.snackBar.open('Tack för din begäran', 'Stäng', {
            duration: 3000
          });
        },
        err => {
          console.log(`reset fail ${JSON.stringify(err)}`);
          this.snackBar.open('Något gick fel!', 'Stäng', {
            duration: 3000
          });
        }
      );

    }
  }

  navigateBack() {
    this.store.dispatch(new fromRoot.Back());
  }

  onConfirm(): void {
    this.confirmSubscription = this.passwordService.resetPassword(this.emailControl.value, this.code).subscribe(
      res => {
        console.log(`confirm reset success ${res}`);
        this.snackBar.open('Meijl med ett nytt lösenord har skckats', 'Stäng', {
          duration: 3000
        });
      },
      err => {
        console.log(`confirm reset fail ${JSON.stringify(err)}`);
        this.snackBar.open('Något gick fel!', 'Stäng', {
          duration: 3000
        });
      }
    );

  }
}

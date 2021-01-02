import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as fromRoot from '../../state';
import {Store} from '@ngrx/store';
import * as fromStore from '../../../admin/state';
import {PasswordService} from '../../../seller/services/password.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],

})
export class ResetPasswordComponent implements OnInit {

  title = 'Lösenord återställning';

  emailControl = new FormControl('', [
    Validators.email,
    Validators.required,
  ]);

  constructor(private snackBar: MatSnackBar,
              private store: Store<fromStore.AdminState>,
              private passwordService: PasswordService
              ){}

  ngOnInit(): void {
  }

  sendResetRequest(): void {
    if(this.emailControl.hasError('required')
      || this.emailControl.hasError('email')){

      this.snackBar.open('Rätta email.', 'Ok', {
        duration: 2000,
      });

    }else {
      console.log(this.emailControl.value);
      console.log(this.passwordService.requestNewPassword(this.emailControl.value));

      this.snackBar.open('Tack för din begäran', 'Stäng', {
        duration: 3000
      });

      this.store.dispatch(new fromRoot.Back());
    }
  }

  navigateBack(){
    this.store.dispatch(new fromRoot.Back());
  }
}

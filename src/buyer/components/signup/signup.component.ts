import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, Validators} from '@angular/forms';
import * as fromRoot from '../../../app/state';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  title = 'Skapa profil';
  hide = true;

  enteredPassword = '';
  enteredPassword2 = '';

  isLinear = false;

  nameControl = new FormControl('', [
    Validators.minLength(2),
    Validators.required
  ]);
  emailControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);
  streetControl = new FormControl('', [
    Validators.minLength(5),
    Validators.required

  ]);
  cityControl = new FormControl('', [
    Validators.minLength(2),
    Validators.required

  ]);
  mobileControl = new FormControl('', [
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.required
  ]);

  constructor(private store: Store<fromState.BuyerState>, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  onCreate(): void {
    if (this.enteredPassword !== this.enteredPassword2
      || this.enteredPassword.length < 8
      || this.emailControl.hasError('email')
      || this.emailControl.hasError('required')
      || this.mobileControl.hasError('minlength')
      || this.mobileControl.hasError('maxlength')
      || this.mobileControl.hasError('required')
      || this.nameControl.hasError('required')
      || this.nameControl.hasError('minlength')
      || this.streetControl.hasError('minlength')
      || this.streetControl.hasError('required')
      || this.cityControl.hasError('minlength')
      || this.cityControl.hasError('required')
    ) {
      this.snackBar.open('Rätta felen.', 'Ok', {
        duration: 2000,
      });
    } else {
      this.snackBar.open('Inga fel.', 'Ok', {
        duration: 2000,
      });

    }
  }

  public navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }
}

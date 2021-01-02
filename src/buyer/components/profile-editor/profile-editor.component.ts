import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';
import * as fromRoot from 'src/app/state';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent implements OnInit {

  userObservable$ = new Observable();

  title = 'Redigera din profil';

  newName = '';
  newMobile = '';

  name = '';
  email = '';
  mobile = '';

  emailControl = new FormControl();
  mobileControl = new FormControl();
  nameControl = new FormControl();

  constructor(private snackBar: MatSnackBar,
              private store: Store<fromState.BuyerState>) {
  }

  ngOnInit(): void {
    this.userObservable$ = this.store.select(fromState.getCurrentUser).pipe(
      tap(user => {
        if (user) {
          this.name = user.name;
          this.nameControl = new FormControl(user.name, [Validators.required]);
          this.mobile = user.mobilenbr;
          this.mobileControl = new FormControl(user.mobilenbr, [
            Validators.minLength(10),
            Validators.maxLength(13)
          ]);
          this.mobileControl = new FormControl(user.mobilenbr, [
            Validators.minLength(10),
            Validators.maxLength(13),
            Validators.required
          ]);
        }
      })
    );
  }

  onSave(): void {
    if (
       this.mobileControl.hasError('maxLength')
      || this.mobileControl.hasError('minLength')
      || this.mobileControl.hasError('required')
      || this.nameControl.hasError('required')
    ) {
      this.snackBar.open('Rätta felen!', 'Ok', {
        duration: 2000
      });
    } else if (isNaN(Number(this.mobileControl.value))) {
      this.snackBar.open('Mobilnummret kan bara innehålla siffror.', 'Ok', {
        duration: 2000
      });
    } else {

      if (this.isMobileChanged() || this.isNameChanged()) {
        this.userObservable$ = this.store.select(fromState.getCurrentUser).pipe(
          tap(user => {
            if (user) {
              const newUser =
                {
                  ...user,
                  email:  this.emailControl.value,
                  name: this.nameControl.value,
                  mobilenbr: this.mobileControl.value
                };
              this.store.dispatch(new fromState.BuyerUpdateUser(newUser));
            }
          })
        );
      } else {
        this.snackBar.open('Inga ändringar', 'ok', {
          duration: 2000
        });

      }
    }
    console.log('isNameChanged: ' + this.isNameChanged());
    console.log('isMobileChanged: ' + this.isMobileChanged());

  }

  onCancel(): void {
    this.store.dispatch(new fromRoot.Back());
  }

  private isNameChanged(): boolean {
    return this.name !== this.nameControl.value;
  }

  private isMobileChanged(): boolean {
    return this.mobile !== this.mobileControl.value;
  }

}

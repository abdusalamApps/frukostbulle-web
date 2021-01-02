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

  newMobile = '';

  name: string = '';
  email: string = '';
  mobile = '';
  deadLine= -1;

  // emailControl = new FormControl();
  mobileControl = new FormControl(0, [
    Validators.minLength(10),
    Validators.maxLength(13)
  ]);
  nameControl = new FormControl();

  orderBufferControl = new FormControl(0, [
    Validators.minLength(1),
    Validators.maxLength(1)
  ]);
  constructor(private snackBar: MatSnackBar,
              private store: Store<fromState.SellerState>) {
  }

  ngOnInit(): void {
    this.userObservable$ = this.store.select(fromState.getCurrentUser).pipe(
      tap(user => {
        if (user) {
          this.name = user.name;
          this.nameControl = new FormControl(user.name, [Validators.required]);
          this.deadLine = user.orderBuffer;
          this.orderBufferControl = new FormControl(user.orderBuffer, [
            Validators.minLength(1),
            Validators.maxLength(1),
          ]);
          this.mobile = user.mobilenbr;
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
      || this.orderBufferControl.hasError('minLength')
      || this.orderBufferControl.hasError('maxLength')

    ) {
      this.snackBar.open('Rätta felen!', 'Ok', {
        duration: 2000
      });
    } else if (isNaN(Number(this.mobileControl.value))) {
      this.snackBar.open('Mobilnummret kan bara innehålla siffror.', 'Ok', {
        duration: 2000
      });
    } else {

      if ( this.isNameChanged() || this.isMobileChanged() || this.isOrderBufferChanged() ) {

        this.userObservable$ = this.store.select(fromState.getCurrentUser).pipe(
          tap(user => {
            if (user) {
              const newUser =
                {
                  ...user,
                  name: this.nameControl.value,
                  orderBuffer: this.orderBufferControl.value,
                  mobilenbr: this.mobileControl.value
                };
              this.store.dispatch(new fromState.UpdateUser(newUser));
            }
          })
        );

      } else {
        this.snackBar.open('Inga ändringar', 'ok', {
          duration: 2000
        });

      }
    }
  }

  onCancel(): void {
    this.store.dispatch(new fromRoot.Back());
  }

  private isOrderBufferChanged() {
    return this.deadLine !== this.orderBufferControl.value;
  }

  private isNameChanged(): boolean {
    return this.name !== this.nameControl.value;
  }

  private isMobileChanged(): boolean {
    return this.mobile !== this.mobileControl.value;
  }

}

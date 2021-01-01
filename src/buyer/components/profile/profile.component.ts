import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';
import * as fromRoot from '../../../app/state';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userObservable$ = new Observable<User | null>();
  associatedSeller$ = new Observable<User | null>();

  title = 'Min profil';
  reminder= false;
  file = new File(['nofing'], 'empty file');

  imageSrc = 'assets/img/profile-photo-placeholder.png';

  constructor(private snackBar: MatSnackBar,
              private store: Store<fromState.BuyerState>) {}

  ngOnInit(): void {
    this.userObservable$ = this.store.select(fromState.getCurrentUser).pipe(
      tap(user => {
        if (user) {
          this.reminder = user.reminder;
        }
      })
    );    this.associatedSeller$ = this.store.select(fromState.getCurrentAssociatedSeller);
  }

  public navigateToProfileEditor(): void {
  }

  chooseImage(event: any): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      [this.file] = event.target.files;
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        console.log(this.imageSrc);
        console.log(this.file.valueOf());
      };
    }
  }

  onLogout(): void {
    this.store.dispatch(new fromState.BuyerLogout());
  }

  reminderChange(event: any) {
    if (event.checked != this.reminder){
      this.reminder= event.checked;
      console.log(event.checked);

      this.userObservable$ = this.store.select(fromState.getCurrentUser).pipe(
        tap(user => {
          if (user) {
            const newUser =
              {
                ...user,
                reminder:  this.reminder,
              };
            this.store.dispatch(new fromState.SetReminder(newUser));
            this.store.dispatch(new fromState.BuyerUpdateUser(newUser));

            this.userObservable$ = this.store.select(fromState.getCurrentUser);
          }
        })
      );
    }else {
      this.snackBar.open('Inga ändringar', 'ok', {
        duration: 2000
      });

    }
  console.log('isReminderChanged: ' + this.reminder);

  }

}

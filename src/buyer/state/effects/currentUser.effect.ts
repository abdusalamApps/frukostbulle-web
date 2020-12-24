import {Injectable} from '@angular/core';

import {Effect, Actions, createEffect, ofType} from '@ngrx/effects';
import * as loginAction from '../actions/login.action';
import {map, switchMap, catchError, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as fromRoot from '../../../app/state';
import * as userActions from '../actions/currentUser.action';
import * as loginActions from '../actions/login.action';

import {MatDialog} from '@angular/material/dialog';

import {Store} from '@ngrx/store';
import {LogoutDialog} from 'src/seller/components/logout-dialog/logout-dialog.component';
import {LoginState} from '../reducers/login.reducer';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UsersService} from '../../../seller/services/users.service';
import {User} from '../../../models/user.model';


@Injectable()
export class CurrentUserEffect {
  constructor(private actions$: Actions,
              private userService: UsersService,
              private store: Store<LoginState>,
  ) {
  }

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(ofType(userActions.LOAD_CURRENT_USER),
      switchMap((action: userActions.LoadCurrentUser) => {
        return this.userService.getUserByEmail(action.payload).pipe(
          map((user: User) => new userActions.LoadCurrentUserSuccess((user))),
          catchError((error: any) => of(new userActions.LoadCurrentUserFail(error)))
        );
      })
    )
  );
  loadCurrentUserSuccess$ = createEffect(() =>
    this.actions$.pipe(ofType(userActions.LOAD_CURRENT_USER_SUCCESS),
      switchMap((action: userActions.LoadCurrentUserSuccess) => {
        localStorage.setItem('userId', action.payload.id.toString(10));
        localStorage.setItem('userEmail', action.payload.email);
        return of(new userActions.LoadCurrentUserSeller(action.payload.id));
      })
    )
  );
}

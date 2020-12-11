import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import * as userActions from '../actions/currentUser.action'
import {UsersService} from '../../services/users.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class CurrentUserEffects {
  constructor(private actions$: Actions,
              private userService: UsersService) {
  }

  @Effect()
  loadCurrentUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(userActions.LOAD_CURRENT_USER),
    switchMap((email) => {
      return this.userService.getUserByEmail(email).pipe(
        map((user) => new userActions.LoadCurrentUserSuccess(user)),
        catchError((error) => of(new userActions.LoadCurrentUserFail(error)))
      )
    })
  ))
}

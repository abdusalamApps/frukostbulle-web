import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as userActions from '../actions/currentUser.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {User} from 'src/models/user.model';
import {LoadCurrentUser} from "../actions/currentUser.action";
import {UsersService} from '../../../seller/services/users.service';

@Injectable()
export class CurrentUserEffects {
  constructor(private actions$: Actions,
              private userService: UsersService) {
  }

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.LOAD_CURRENT_USER),
      switchMap((action: LoadCurrentUser) => {
        return this.userService.getUserByEmail(action.payload).pipe(
          map((user: User) => new userActions.LoadCurrentUserSuccess(user)),
          catchError((error: any) => of(new userActions.LoadCurrentUserFail(error)))
        );
      })
    )
  );
  loadCurrentUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.LOAD_CURRENT_USER_SUCCESS),
      map((action: userActions.LoadCurrentUserSuccess) => {
        localStorage.setItem('currentUserId', action.payload.id.toString(10));
        localStorage.setItem('currentUserEmail', action.payload.email);
      })
    ),
    {dispatch: false}
  );


}

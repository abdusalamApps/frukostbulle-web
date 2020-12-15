import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import * as userActions from '../actions/currentUser.action';
import {UsersService} from '../../services/users.service';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as fromRoot from 'src/app/state';
import {User} from 'src/models/user.model';

@Injectable()
export class CurrentUserEffects {
  constructor(private actions$: Actions,
              private userService: UsersService) {
  }

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.LOAD_CURRENT_USER),
      switchMap((email: string) => {
        return this.userService.getUserByEmail(email).pipe(
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
        localStorage.setItem('currentUserId', action.payload.id.toString(10))
      })
    ),
    {dispatch: false}
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.UPDATE_USER),
      switchMap((action: userActions.UpdateUser) => {
        return this.userService.updateUser(action.payload).pipe(
          map(() => new userActions.UpdateUserSuccess(action.payload)),
          catchError((error: any) => of(new userActions.UpdateUserFail(error)))
        );
      })
    )
  );

  updateUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.UPDATE_USER_SUCCESS),
      mergeMap((action: userActions.UpdateUserSuccess) => {
        return of(new fromRoot.Back());
      })
    )
  );

  updateDates$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.UPDATE_DATES),
    switchMap((action: userActions.UpdateDates) => {
      return this.userService.updateSellerDates(action.sellerId, action.dates).pipe(
        map(() => new userActions.UpdateDatesSuccess(action.dates)),
        catchError((error: any) => of(new userActions.UpdateDatesFail(error)))
      );
    })
    )
  );

  updateDatesSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.UPDATE_DATES_SUCCESS),
    mergeMap((action: userActions.UpdateDatesSuccess) => {
      return of(new fromRoot.Back());
    })
    )
  );

}

import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import * as userActions from '../actions/currentUser.action';
import {UsersService} from '../../services/users.service';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as fromRoot from 'src/app/state';

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
        );
      })
    )
  );

  @Effect()
  updateUser$ = this.actions$.pipe(
    ofType(userActions.UPDATE_USER),
    switchMap((action: userActions.UpdateUser) => {
      return this.userService.updateUser(action.payload).pipe(
        map(() => new userActions.UpdateUserSuccess(action.payload)),
        catchError((error) => of(new userActions.UpdateUserFail(error)))
      );
    })
  );

  @Effect()
  updateUserSuccess$ = this.actions$.pipe(
    ofType(userActions.UPDATE_USER_SUCCESS),
    mergeMap((action: userActions.UpdateUserSuccess) => {
      return of(new fromRoot.Back());
    })
  );

  @Effect()
  updateDates$ = this.actions$.pipe(
    ofType(userActions.UPDATE_DATES),
    switchMap((action: userActions.UpdateDates) => {
      return this.userService.updateSellerDates(action.sellerId, action.dates).pipe(
        map(() => new userActions.UpdateDatesSuccess(action.dates)),
        catchError((error) => of(new userActions.UpdateDatesFail(error)))
      );
    })
  );

  @Effect()
  updateDatesSuccess$ = this.actions$.pipe(
    ofType(userActions.UPDATE_DATES_SUCCESS),
    switchMap((action: userActions.UpdateDatesSuccess) => [
      // new fromRoot.UpdateStorageAvailableDates(action.dates),
      new fromRoot.Back()
    ])
  );

}

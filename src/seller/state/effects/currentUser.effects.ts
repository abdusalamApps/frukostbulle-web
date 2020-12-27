import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import * as userActions from '../actions/currentUser.action';
import {UsersService} from '../../services/users.service';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as fromRoot from 'src/app/state';
import {User} from 'src/models/user.model';
import {BakeryService} from '../../services/bakery.service';
import {Bakery} from '../../../models/bakery.model';
import {AreaService} from '../../services/area.service';
import {Area} from '../../../models/area.model';
import {LoadCurrentUser} from "../actions/currentUser.action";

@Injectable()
export class CurrentUserEffects {
  constructor(private actions$: Actions,
              private userService: UsersService,
              private bakeryService: BakeryService,
              private areaService: AreaService) {
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

  /*
    loadCurrentUserSuccess$ = createEffect(() =>
        this.actions$.pipe(
          ofType(userActions.LOAD_CURRENT_USER_SUCCESS),
          seller-area((actions: userActions.LoadCurrentUserSuccess) => {
            localStorage.setItem('currentUserId', actions.payload.id.toString(10));
            localStorage.setItem('currentUserEmail', actions.payload.email);
          })
        ),
      {dispatch: false}
    );
  */

  loadCurrentUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.LOAD_CURRENT_USER_SUCCESS),
      switchMap((action: userActions.LoadCurrentUserSuccess) => {
        localStorage.setItem('currentUserId', action.payload.id.toString(10));
        localStorage.setItem('currentUserEmail', action.payload.email);
        return of(new userActions.LoadCurrentUserBakery(action.payload.id));
      })
    ),
  );

  loadCurrentUserSuccess2$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.LOAD_CURRENT_USER_SUCCESS),
      switchMap((action: userActions.LoadCurrentUserSuccess) => {
        return of(new userActions.LoadCurrentUserArea(action.payload.id));
      })
    ),
  );

  loadCurrentUserBakery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.LOAD_CURRENT_USER_BAKERY),
      switchMap((action: userActions.LoadCurrentUserBakery) => {
        return this.bakeryService.getBakeryBySellerId(action.payload).pipe(
          map((bakery: Bakery) => new userActions.LoadCurrentUserBakerySuccess(bakery)),
          catchError((error: any) => of(new userActions.LoadCurrentUserBakeryFail(error)))
        );
      })
    )
  );

  loadCurrentUserArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.LOAD_CURRENT_USER_AREA),
      switchMap((action: userActions.LoadCurrentUserArea) => {
        return this.areaService.getAreaBySellerId(action.payload).pipe(
          map((area: Area) => new userActions.LoadCurrentUserAreaSuccess(area)),
          catchError((error: any) => of(new userActions.LoadCurrentUserAreaFail(error)))
        );
      })
    )
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

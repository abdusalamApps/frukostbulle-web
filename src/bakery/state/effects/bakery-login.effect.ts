import {Injectable} from '@angular/core';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as loginActions from '../actions/bakery-login.action';
import {map, switchMap, catchError, mergeMap} from 'rxjs/operators';
import {AuthService} from '../../../app/services/auth.service';
import {of} from 'rxjs';

import * as fromRoot from '../../../app/state';
import {MatDialog} from '@angular/material/dialog';

import {Store} from '@ngrx/store';
import {LogoutDialog} from '../../../seller/components/logout-dialog/logout-dialog.component';
import {BakeryLoginState} from '../reducers/bakery-login.reducer';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PermissionLevel} from "../../../models/user.model";
import * as userActions from '../actions/currentUser.action';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions,
              private authService: AuthService,
              private dialog: MatDialog,
              private store: Store<BakeryLoginState>,
              private snackBar: MatSnackBar) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions.LOGIN_BAKERY),
      switchMap((action: loginActions.LoginBakery) => {
        return this.authService.login(action.payload).pipe(
          map((response) => new loginActions.LoginBakerySuccess(response)),
          catchError((error) => of(new loginActions.LoginBakeryFail(error)))
        );
      })
    )
  );
   loginSuccess$ = createEffect(() =>
     this.actions$.pipe(
       ofType(loginActions.LOGIN_BAKERY_SUCCESS),
       switchMap((action: loginActions.LoginBakerySuccess) => [
         new userActions.LoadCurrentUser(action.payload.email),
         new fromRoot.Go({path: ['bakery/orders']}),
       ]),
     )
   );

  logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loginActions.LOGOUT_BAKERY),
        map((action: loginActions.LogoutBakery) => {
          this.dialog.open(LogoutDialog, {
            data: {
              name: '',
              store: this.store,
              permissionLevel: PermissionLevel.BAKERY
            }
          });
        })
      ),
    {dispatch: false}
  );

  loginFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loginActions.LOGIN_BAKERY_FAIL),
        map((action: loginActions.LoginBakeryFail) => {
          this.snackBar.open('Fel e-post eller lösenord!', 'Ok', {
            duration: 2000
          });
        }),
      ),
    {dispatch: false}
  );


  logoutConfirm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions.LOGOUT_BAKERY_CONFIRM),
      mergeMap((action: loginActions.LogoutBakeryConfirm) => {
        return of(new fromRoot.Go({path: ['/bakery/login'], extras: {replaceUrl: true}}));
      })
    )
  );
}

import {Injectable} from '@angular/core';

import {Effect, Actions, createEffect, ofType} from '@ngrx/effects';
import * as loginAction from '../actions/buyerLoginAction';
import {map, switchMap, catchError, mergeMap} from 'rxjs/operators';
import {AuthService} from '../../../app/services/auth.service';
import {of} from 'rxjs';

import * as fromRoot from '../../../app/state';
import * as userActions from '../actions/buyerCurrentUserAction';
import * as loginActions from '../actions/buyerLoginAction';

import {MatDialog} from '@angular/material/dialog';

import {Store} from '@ngrx/store';
import {LogoutDialog} from 'src/seller/components/logout-dialog/logout-dialog.component';
import {BuyerLoginState} from '../reducers/login.reducer';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PermissionLevel} from "../../../models/user.model";

@Injectable()
export class BuyerLoginEffect {
  constructor(private actions$: Actions,
              private authService: AuthService,
              private dialog: MatDialog,
              private store: Store<BuyerLoginState>,
              private snackBar: MatSnackBar) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction.BUYER_LOGIN),
      switchMap((action: loginAction.BuyerLogin) => {
        return this.authService.login(action.payload).pipe(
          map((response) => new loginActions.BuyerLoginSuccess(response)),
          catchError((error) => of(new loginAction.BuyerLoginFail(error)))
        );
      })
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction.BUYER_LOGIN_SUCCESS),
      switchMap((action: loginAction.BuyerLoginSuccess) => [
        // console.log(`paylod@LoginSuccess: ${actions.payload.email}`);
        new userActions.BuyerLoadCurrentUser(action.payload.email),
        new fromRoot.Go({path: ['buyer/items']})
      ]),
      // seller-area((authResponse) => new userActions.LoadCurrentUser(authResponse)),
      // seller-area((authResponse) => new fromRoot.Go({ path: ['seller/items'] }))
    )
  );

  logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loginAction.BUYER_LOGOUT),
        map((action: loginAction.BuyerLogout) => {
          this.dialog.open(LogoutDialog, {
            data: {
              name: '',
              store: this.store,
              permissionLevel: PermissionLevel.BUYER
            }
          });
        })
      ),
    {dispatch: false}
  );

  loginFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loginActions.BUYER_LOGIN_FAIL),
        map((action: loginActions.BuyerLoginFail) => {
          this.snackBar.open('Fel e-post eller lösenord!', 'Ok', {
            duration: 2000
          });
        }),
      ),
    {dispatch: false}
  );


  logoutConfirm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction.BUYER_LOGOUT_CONFIRM),
      mergeMap((action: loginAction.BuyerLogoutConfirm) => {
        return of(new fromRoot.Go({path: ['/buyer/login'], extras: {replaceUrl: true}}));
      })
    )
  );
}

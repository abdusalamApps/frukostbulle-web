import {Injectable} from '@angular/core';

import {Effect, Actions, createEffect, ofType} from '@ngrx/effects';
import * as loginAction from '../actions/login.action';
import {map, switchMap, catchError, mergeMap} from 'rxjs/operators';
import {AuthService} from '../../../app/services/auth.service';
import {of} from 'rxjs';

import * as fromRoot from '../../../app/state';
import * as loginActions from '../actions/login.action';
import * as orderActions from '../actions/order.action';

import {MatDialog} from '@angular/material/dialog';

import {Store} from '@ngrx/store';
import {LogoutDialog} from '../../../seller/components/logout-dialog/logout-dialog.component';
import {LoginState} from '../reducers/login.reducer';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions,
              private authService: AuthService,
              private dialog: MatDialog,
              private store: Store<LoginState>,
              private snackBar: MatSnackBar) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction.LOGIN),
      switchMap((action: loginAction.Login) => {
        return this.authService.login(action.payload).pipe(
          map((response) => new loginAction.LoginSuccess(response)),
          catchError((error) => of(new loginAction.LoginFail(error)))
        );
      })
    )
  );
   loginSuccess$ = createEffect(() =>
     this.actions$.pipe(
       ofType(loginAction.LOGIN_SUCCESS),
       switchMap((actions: loginAction.LoginSuccess) => [
         // new orderActions.LoadBakeryOrders(actions.payload.email),
         new fromRoot.Go({path: ['bakery/orders']})
       ]),
     )
   );

  logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loginAction.LOGOUT),
        map((action: loginAction.Logout) => {
          this.dialog.open(LogoutDialog, {
            data: {
              name: '',
              store: this.store
            }
          });
        })
      ),
    {dispatch: false}
  );

  loginFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loginActions.LOGIN_FAIL),
        map((action: loginActions.LoginFail) => {
          this.snackBar.open('Fel e-post eller lösenord!', 'Ok', {
            duration: 2000
          });
        }),
      ),
    {dispatch: false}
  );


  logoutConfirm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction.LOGOUT_CONFIRM),
      mergeMap((action: loginAction.LogoutConfirm) => {
        return of(new fromRoot.Go({path: ['/bakery/login'], extras: {replaceUrl: true}}));
      })
    )
  );
}

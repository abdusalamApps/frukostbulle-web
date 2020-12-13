import {Injectable} from '@angular/core';

import {Effect, Actions, createEffect, ofType} from '@ngrx/effects';
import * as loginAction from '../actions/login.action';
import {map, switchMap, catchError, mergeMap} from 'rxjs/operators';
import {AuthService} from '../../../app/services/auth.service';
import {of} from 'rxjs';

import * as fromRoot from '../../../app/state';
import * as userActions from '../actions/currentUser.action';
import * as loginActions from '../actions/login.action';
import * as userSelectors from '../selectors/currentUser.selectors';

import {MatDialog} from '@angular/material/dialog';

import {Store} from '@ngrx/store';
import {LogoutDialog} from '../../components/logout-dialog/logout-dialog.component';
import {LoginState} from '../reducers/login.reducer';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions,
              private authService: AuthService,
              private dialog: MatDialog,
              private store: Store<LoginState>) {
  }

  @Effect()
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

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(loginAction.LOGIN_SUCCESS),
    switchMap((action: loginAction.LoginSuccess) => [
      // console.log(`paylod@LoginSuccess: ${action.payload.email}`);
      new userActions.LoadCurrentUser(action.payload.email),
      new fromRoot.Go({path: ['seller/items']})
    ]),
    // map((authResponse) => new userActions.LoadCurrentUser(authResponse)),
    // map((authResponse) => new fromRoot.Go({ path: ['seller/items'] }))
  );

  @Effect({dispatch: false})
  loginFail$ = this.actions$.pipe(
    ofType(loginAction.LOGIN_FAIL),
    map((action: loginAction.LoginFail) => action.payload)
  );

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType(loginAction.LOGOUT),
    map((action: loginAction.Logout) => {
      this.dialog.open(LogoutDialog, {
        data: {
          name: '',
          store: this.store
        }
      });
    })
  );

  @Effect()
  logoutConfirm$ = this.actions$.pipe(
    ofType(loginAction.LOGOUT_CONFIRM),
    mergeMap((action: loginAction.LogoutConfirm) => {
      return of(new fromRoot.Go({path: ['/seller/login']}))
    })
  );
}

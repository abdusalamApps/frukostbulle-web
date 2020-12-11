import { Injectable } from '@angular/core';

import { Effect, Actions, createEffect, ofType } from '@ngrx/effects';
import * as loginAction from '../actions/login.action';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../../../app/services/auth.service';
import { of } from 'rxjs';

import * as fromRoot from '../../../app/state';
import * as userActions from '../actions/currentUser.action'

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

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
    map((action: loginAction.LoginSuccess) => action.payload),
    map((authResponse) => new userActions.LoadCurrentUser(authResponse.email)),
    map((authResponse) => new fromRoot.Go({ path: ['seller/my-items'] }))
  );

  @Effect({ dispatch: false })
  loginFail$ = this.actions$.pipe(
    ofType(loginAction.LOGIN_FAIL),
    map((action: loginAction.LoginFail) => action.payload)
  );
}

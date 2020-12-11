import { AuthState } from '../reducers';
import { AuthService } from './../../../app/services/auth.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as authActions from '../actions/auth.actions';
import * as routerActions from '../../../app/state/actions/router.actions';

import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AuthState>
  ) {}

  @Effect()
  setAuthenticated$ = this.actions$.pipe(
    ofType(authActions.SET_AUTHINTICATED),
    switchMap((action: authActions.SetAuthenticated) => {
      // Get the role
      const role = action.payload.roles;
      // Decode the role string to a valid path
      // if role === '[ROLE_BUYER]' => path === 'buyer'
      const path = role.substring(6, role.length - 1).toLowerCase();
      localStorage.setItem('toke', action.payload.Authorization);
      localStorage.setItem('email', action.payload.email);
      return of(
        new routerActions.Go({ path: [path], extras: { replaceUrl: true } })
      );
    })
  );

  @Effect()
  setNotAuthenticated$ = this.actions$.pipe(
    ofType(authActions.SET_NOT_AUTHINTICATED),
    switchMap((action: authActions.SetNotAuthenticated) => {
      console.log(`setNoAuthecnticated effect called, action: ${action.type}`);
      return of(new routerActions.Go({ path: ['login'] }));
    })
  );

  @Effect()
  checkAuthenticated$ = this.actions$.pipe(
    ofType(authActions.CHECK_AUTHINTICATED),
    switchMap(() => {
      return this.authService.checkAuthenticated().pipe(
        map((response) => {
          console.log(response);
          this.store.dispatch(new authActions.CheckAuthecticatedSuccess());
        }),
        catchError((error) => of(new authActions.CheckAuthecticatedFail(error)))
      );
    })
  );
}

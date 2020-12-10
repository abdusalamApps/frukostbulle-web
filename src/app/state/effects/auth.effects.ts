import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as authActions from '../actions/auth.actions';
import * as routerActions from '../actions/router.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  setAuthenticated$ = this.actions$.pipe(
    ofType(authActions.SET_AUTHINTICATED),
    map((action: authActions.SetAuthenticated) => action.payload),
    map((authResponse) => {
      switch (authResponse.roles) {
        case '[ROLE_BUYER]': {
          new routerActions.Go({
            path: ['buyer'],
          });
          break;
        }
        case '[ROLE_SELLER]': {
          new routerActions.Go({
            path: ['seller'],
          });
          break;
        }
        case '[ROLE_ADMIN]': {
          new routerActions.Go({
            path: ['admin'],
          });
          break;
        }
        case '[ROLE_BAKERY]': {
          new routerActions.Go({
            path: ['bakery'],
          });
        }
      }
    })
  );

  @Effect()
  setNotAuthenticated$ = this.actions$.pipe(
    ofType(authActions.SET_NOT_AUTHINTICATED),
    map((action: authActions.SetAuthenticated) => {
      console.log(`effect called, action: ${action.payload}`);
      new routerActions.Go({ path: ['login'] });
    })
  );
}

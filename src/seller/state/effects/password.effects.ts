import * as passwordActions from '../actions/password.action';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PasswordService} from '../../services/password.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';


@Injectable()
export class PasswordEffects {
  constructor(private actions$: Actions,
              private passwordService: PasswordService) {
  }

  checkPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(passwordActions.CHECK_PASSWORD),
      switchMap((action: passwordActions.CheckPassword) => {
        return this.passwordService.checkPassword(action.payload).pipe(
          map((res: boolean) => new passwordActions.CheckPasswordSuccess(res)),
          catchError((error: any) => of(new passwordActions.CheckPasswordFail(error)))
        );
      })
    )
  );
/*
  checkPasswordSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(passwordActions.CHECK_PASSWORD_SUCCESS),
    switchMap((actions: passwordActions.CheckPasswordSuccess) => {

    })
  ))

  updatePassword$ = createEffect(() =>
  this.actions$.pipe(
    ofType(passwordActions.UPDATE_PASSWORD),
    switchMap((actions: passwordActions.UpdatePassword) => {
      return this.passwordService.updatePassword(actions.payload).pipe(
        map((res))
      )
    })
  ))*/
}

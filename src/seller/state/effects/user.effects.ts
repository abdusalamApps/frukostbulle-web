import {User} from '../../../models/user.model';
import * as userActions from '../actions/user.action';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UsersService} from '../../services/users.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
              private userService: UsersService) {
  }

  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.LOAD_USER_BUY_ID),
      switchMap((action: userActions.LoadUserById) => {
        return this.userService.getUserById(action.payload).pipe(
          map((user: User) => new userActions.LoadUserByIdSuccess(user)),
          catchError((error: any) => of(new userActions.LoadUserByIdFail(error)))
        );
      })
    )
  );
}

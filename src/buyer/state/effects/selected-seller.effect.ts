import {User} from '../../../models/user.model';
import * as userActions from '../actions/selected-seller.action';
import * as fromRoot from 'src/app/state';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UsersService} from '../../services/users.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class SelectedSellerEffect {
  constructor(private actions$: Actions,
              private userService: UsersService) {
  }

  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.LOAD_SELECTED_SELLER),
      switchMap((action: userActions.LoadSelectedSeller) => {
        return this.userService.getUserById(action.payload).pipe(
          map((user: User) => new userActions.LoadSelectedSellerSuccess(user)),
          catchError((error: any) => of(new userActions.LoadSelectedSellerFail(error)))
        );
      })
    )
  );
}

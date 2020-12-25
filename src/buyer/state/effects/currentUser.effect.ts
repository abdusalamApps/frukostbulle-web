import {Injectable} from '@angular/core';

import {Effect, Actions, createEffect, ofType} from '@ngrx/effects';
import * as loginAction from '../actions/buyerLoginAction';
import {map, switchMap, catchError, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as fromRoot from '../../../app/state';
import * as userActions from '../actions/buyerCurrentUserAction';
import * as loginActions from '../actions/buyerLoginAction';

import {MatDialog} from '@angular/material/dialog';

import {Store} from '@ngrx/store';
import {LogoutDialog} from 'src/seller/components/logout-dialog/logout-dialog.component';
import {BuyerLoginState} from '../reducers/login.reducer';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UsersService} from 'src/seller/services/users.service';
import {User} from '../../../models/user.model';


@Injectable()
export class CurrentUserEffect {
  constructor(private actions$: Actions,
              private userService: UsersService,
              private store: Store<BuyerLoginState>,
  ) {
  }

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(ofType(userActions.BUYER_LOAD_CURRENT_USER),
      switchMap((action: userActions.BuyerLoadCurrentUser) => {
        return this.userService.getUserByEmail(action.payload).pipe(
          map((user: User) => {

            return new userActions.BuyerLoadCurrentUserSuccess((user));
          }),
          catchError((error: any) => of(new userActions.BuyerLoadCurrentUserFail(error)))
        );
      })
    )
  );

  loadCurrentUserSuccess$ = createEffect(() =>
    this.actions$.pipe(ofType(userActions.BUYER_LOAD_CURRENT_USER_SUCCESS),
      switchMap((action: userActions.BuyerLoadCurrentUserSuccess) => {
        localStorage.setItem('currentUserId', action.payload.id.toString(10));
        localStorage.setItem('currentUserEmail', action.payload.email);
        return of(new userActions.BuyerLoadCurrentUserSeller(action.payload.id));
      })
    )
  );

  updateCurrentSeller$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.BUYER_UPDATE_SELLER),
      switchMap((action: userActions.BuyerUpdateSeller) => {
        return this.userService.associateSeller(action.payload.buyerId, action.payload.sellerId).pipe(
          map((user: User) => new userActions.BuyerUpdateSellerSuccess(user)),
          catchError((error: any) => of(new userActions.BuyerUpdateSellerFail(error)))
        );
      })
    )
  );

  updateSellerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.BUYER_UPDATE_SELLER_SUCCESS),
      switchMap((action: userActions.BuyerUpdateSellerSuccess) => {
        let state = localStorage.getItem('state');
        if (!state) state = '';
        const email = JSON.parse(state).buyer.buyerLogin.response.email;
        return of(new userActions.BuyerLoadCurrentUser(email));
      })
    )
  );

}

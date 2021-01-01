import {Injectable} from '@angular/core';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap, catchError} from 'rxjs/operators';
import {of} from 'rxjs';

import * as userActions from '../actions/buyerCurrentUserAction';
import * as itemActions from '../actions/items.action';

import {Store} from '@ngrx/store';
import {BuyerLoginState} from '../reducers/login.reducer';
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
        return of(new userActions.BuyerLoadCurrentUserSeller(action.payload.associatedSeller));
      })
    )
  );

  loadAssociatedSeller$ = createEffect(() =>
    this.actions$.pipe(ofType(userActions.BUYER_LOAD_CURRENT_USER_SELLER),
      switchMap((action: userActions.BuyerLoadCurrentUserSeller) => {
        return this.userService.getUserById(action.payload).pipe(
          map((seller: User) => new userActions.BuyerLoadCurrentUserSellerSuccess(seller)),
          catchError((error: any) => of(new userActions.BuyerLoadCurrentUserSellerFail(error)))
        );
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

  updateSellerSuccess1$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.BUYER_UPDATE_SELLER_SUCCESS),
      switchMap((action: userActions.BuyerUpdateSellerSuccess) => {
        return of(new itemActions.LoadItems(action.payload.id));
      })
    )
  );

  setReminder$ = createEffect(()=>
  this.actions$.pipe(
    ofType(userActions.SET_REMINDER),
    switchMap((action: userActions.SetReminder)=> {
      return this.userService.updateUser(action.payload).pipe(
        map( ()=> new userActions.SetReminderSuccess(action.payload)),
        catchError((error: any)=> of( new userActions.SetReminderFail(error)) )
      );
    })
  )
  );
}

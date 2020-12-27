import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromLogin from './bakery-login.reducer';
import * as fromOrder from './order.reducer';
import * as fromCurrentUser from './currentUser.reducer'

export interface BakeryState {
  login: fromLogin.BakeryLoginState;
  orders: fromOrder.OrderState;
  currentUser:  fromCurrentUser.CurrentUserState
}

export const reducers: ActionReducerMap<BakeryState, any> = {
  login: fromLogin.reducer,
  orders: fromOrder.reducer,
  currentUser: fromCurrentUser.reducer,
};

export const getBakeryState = createFeatureSelector<BakeryState>('bakery');


import * as fromLogin from './login.reducer';
import * as fromCurrentUser from './currentUser.reducer';
import * as fromItems from './items.reducer';
import * as fromOrder from './order.reducer';

import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';


export interface BuyerState {
  login: fromLogin.LoginState;
  currentUser: fromCurrentUser.CurrentUserState;
  items: fromItems.ItemState;
  orders: fromOrder.OrderState;
}

export const reducers: ActionReducerMap<BuyerState, any> = {
  login: fromLogin.reducer,
  currentUser: fromCurrentUser.reducer,
  items: fromItems.reducer,
  orders: fromOrder.reducer,

};

export const getBuyerState = createFeatureSelector<BuyerState>('buyer');

import * as fromLogin from './login.reducer';
import * as fromCurrentUser from './currentUser.reducer';
import * as fromItems from './items.reducer';
import * as fromOrder from './order.reducer';
import * as fromSelectedSeller from './selected-seller.reducer';

import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';


export interface BuyerState {
  buyerLogin: fromLogin.BuyerLoginState;
  currentUser: fromCurrentUser.CurrentUserState;
  items: fromItems.ItemState;
  orders: fromOrder.OrderState;
  selectedSeller: fromSelectedSeller.SelectedSellerState;
}

export const reducers: ActionReducerMap<BuyerState, any> = {
  buyerLogin: fromLogin.reducer,
  currentUser: fromCurrentUser.reducer,
  items: fromItems.reducer,
  orders: fromOrder.reducer,
  selectedSeller: fromSelectedSeller.reducer
};

export const getBuyerState = createFeatureSelector<BuyerState>('buyer');

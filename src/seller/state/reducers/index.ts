import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromLogin from './login.reducer';
import * as fromItems from './items.reducer';
import * as fromCurrentUser from './currentUser.reducer';


export interface SellerState {
  login: fromLogin.LoginState;
  items: fromItems.ItemState;
  currentUser: fromCurrentUser.CurrentUserState;
}

export const reducers: ActionReducerMap<SellerState, any> = {
  login: fromLogin.reducer,
  items: fromItems.reducer,
  currentUser: fromCurrentUser.reducer,
};

export const getSellerState = createFeatureSelector<SellerState>('seller');

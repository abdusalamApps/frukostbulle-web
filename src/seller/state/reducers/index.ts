import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromLogin from './login.reducer';
import * as fromItems from './items.reducer';


export interface SellerState {
  login: fromLogin.LoginState;
  items: fromItems.ItemState;
}

export const reducers: ActionReducerMap<SellerState, any> = {
  login: fromLogin.reducer,
  items: fromItems.reducer
};

export const getSellerState = createFeatureSelector<SellerState>('seller');

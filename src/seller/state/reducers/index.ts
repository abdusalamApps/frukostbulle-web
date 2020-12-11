import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromLogin from './login.reducer';


export interface SellerState {
  login: fromLogin.LoginState;
}

export const reducers: ActionReducerMap<SellerState, any> = {
  login: fromLogin.reducer,
};

export const getSellerState = createFeatureSelector<SellerState>('seller');

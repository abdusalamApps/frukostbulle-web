import * as fromLogin from './login.reducer';
import * as fromCurrentUser from './currentUser.reducer';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';


export interface BuyerState {
  login: fromLogin.LoginState;
  currentUser: fromCurrentUser.CurrentUserState;
}

export const reducers: ActionReducerMap<BuyerState, any> = {
  login: fromLogin.reducer,
  currentUser: fromCurrentUser.reducer,
};

export const getBuyerState = createFeatureSelector<BuyerState>('buyer');

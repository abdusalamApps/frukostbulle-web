import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromLogin from './login.reducer';
import * as fromItems from './items.reducer';
import * as fromCurrentUser from './currentUser.reducer';
import * as fromAreas from './area.reducer';


export interface SellerState {
  login: fromLogin.LoginState;
  items: fromItems.ItemState;
  currentUser: fromCurrentUser.CurrentUserState;
  areas: fromAreas.AreaState;
}

export const reducers: ActionReducerMap<SellerState, any> = {
  login: fromLogin.reducer,
  items: fromItems.reducer,
  currentUser: fromCurrentUser.reducer,
  areas: fromAreas.reducer
};

export const getSellerState = createFeatureSelector<SellerState>('seller');

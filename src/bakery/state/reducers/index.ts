import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromLogin from './login.reducer';
import * as fromOrder from './order.reducer';


export interface BakeryState {
  login: fromLogin.LoginState;
  orders: fromOrder.OrderState;
}

export const reducers: ActionReducerMap<BakeryState, any> = {
  login: fromLogin.reducer,
  orders: fromOrder.reducer,
};

export const getBakeryState = createFeatureSelector<BakeryState>('bakery');


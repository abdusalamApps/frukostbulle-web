import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromLogin from './bakery-login.reducer';
import * as fromOrder from './order.reducer';


export interface BakeryState {
  login: fromLogin.BakeryLoginState;
  orders: fromOrder.OrderState;
}

export const reducers: ActionReducerMap<BakeryState, any> = {
  login: fromLogin.reducer,
  orders: fromOrder.reducer,
};

export const getBakeryState = createFeatureSelector<BakeryState>('bakery');


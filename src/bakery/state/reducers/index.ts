import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromLogin from './login.reducer';


export interface BakeryState {
  login: fromLogin.LoginState;
}

export const reducers: ActionReducerMap<BakeryState, any> = {
  login: fromLogin.reducer,
};

export const getBakeryState = createFeatureSelector<BakeryState>('bakery');


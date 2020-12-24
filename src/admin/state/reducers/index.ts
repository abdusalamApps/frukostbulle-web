import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromLogin from './login.reducer';


export interface AdminState {
  login: fromLogin.LoginState;
}

export const reducers: ActionReducerMap<AdminState, any> = {
  login: fromLogin.reducer,
};

export const getAdminState = createFeatureSelector<AdminState>('admin');


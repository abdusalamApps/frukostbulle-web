import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromLogin from './login.reducer';
import * as fromLoadUsers from './loadUsers.reducer';

export interface AdminState {
  login: fromLogin.LoginState;
  loadUsers: fromLoadUsers.LoadUsersState;
}

export const reducers: ActionReducerMap<AdminState, any> = {
  login: fromLogin.reducer,
  loadUsers: fromLoadUsers.reducer,
};

export const getAdminState = createFeatureSelector<AdminState>('admin');


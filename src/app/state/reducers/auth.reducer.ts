import { User } from './../../../models/user.model';
import { Action, createReducer, on } from '@ngrx/store';

export const authFeatureKey = 'auth';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | undefined;
  authLevel: number;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
  authLevel: -1,
};

export const reducer = createReducer(initialState);

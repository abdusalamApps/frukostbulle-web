import { AuthAction } from './../actions/auth.actions';
import { AuthResponse } from '../../../models/authResponse.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as fromAuth from '../actions/auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  authResponse: AuthResponse | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  authResponse: null,
};

export function reducer(
  state = initialState,
  action: fromAuth.AuthAction
): AuthState {
  switch (action.type) {
    case fromAuth.SET_AUTHINTICATED: {
      const response = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        authResponse: response,
      };
    }
    case fromAuth.SET_NOT_AUTHINTICATED:
      {
        return {
          ...state,
          isAuthenticated: false,
          authResponse: null,
        };
      }
      return state;
  }
}

export const getAuthenticated = (state: AuthState) => state.isAuthenticated;
export const getAuthResponse = (state: AuthState) => state.authResponse;
export const getToken = (state: AuthState) => state.authResponse?.Authorization;
export const getRoles = (state: AuthState) => state.authResponse?.roles;
export const getEmail = (state: AuthState) => state.authResponse?.email;

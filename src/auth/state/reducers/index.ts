import { createFeatureSelector } from '@ngrx/store';

import { AuthResponse } from '../../../models/authResponse.model';
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
    case fromAuth.SET_NOT_AUTHINTICATED: {
      return {
        ...state,
        isAuthenticated: false,
        authResponse: null,
      };
    }
    case fromAuth.CHECK_AUTHINTICATED: {
      return {
        ...state,
      };
    }
    case fromAuth.CHECK_AUTHINTICATED_SUCCESS:
      {
        return {
          ...state,
          isAuthenticated: true,
        };
      }
      return state;
    case fromAuth.CHECK_AUTHINTICATED_FAIL:
      {
        return {
          ...state,
          isAuthenticated: false,
        };
      }
      return state;
  }
}

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getAuthenticated = (state: AuthState) => state.isAuthenticated;
export const getAuthResponse = (state: AuthState) => state.authResponse;
export const getToken = (state: AuthState) => state.authResponse?.Authorization;
export const getRoles = (state: AuthState) => state.authResponse?.roles;
export const getEmail = (state: AuthState) => state.authResponse?.email;

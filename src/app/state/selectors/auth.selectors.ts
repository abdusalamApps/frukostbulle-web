import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromAuth from './../reducers/auth.reducer';

export const getAuthState = createSelector(
  fromAuth.getAuthState,
  (state: fromAuth.AuthState) => state
);

export const getAuthenticated = createSelector(
  getAuthState,
  fromAuth.getAuthenticated
);

export const getAuthResponse = createSelector(
  getAuthState,
  fromAuth.getAuthResponse
);

export const getToken = createSelector(getAuthState, fromAuth.getToken);

export const getRoles = createSelector(getAuthState, fromAuth.getRoles);
export const getEmail = createSelector(getAuthState, fromAuth.getEmail);

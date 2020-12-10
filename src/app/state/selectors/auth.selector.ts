import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromAuth from '../reducers/auth.reducer';

export const getRootState = createSelector(
  fromFeature.getStoreRootState,
  (state: fromFeature.RootState) => state
);

export const getAuthState = createSelector(
  getRootState,
  (state: fromFeature.RootState) => state.auth
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

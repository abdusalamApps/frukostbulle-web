import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const getAuthState = createSelector(
  fromFeature.getAuthState,
  (state: fromFeature.AuthState) => state
);

export const getAuthenticated = createSelector(
  getAuthState,
  fromFeature.getAuthenticated
);

export const getAuthResponse = createSelector(
  getAuthState,
  fromFeature.getAuthResponse
);

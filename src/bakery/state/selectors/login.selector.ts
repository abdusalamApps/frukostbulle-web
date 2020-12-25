import {createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromLogin from '../reducers/login.reducer';


export const getLoginState = createSelector(
  fromFeature.getBakeryState,
  (state: fromFeature.BakeryState) => state.login
);

export const getPending = createSelector(getLoginState, fromLogin.getPending);
export const getLoggedIn = createSelector(getLoginState, fromLogin.getLoggedIn);

export const getAuthResponse = createSelector(getLoginState, fromLogin.getAuthResponse);

export const getToken = createSelector(getLoginState, fromLogin.getToken);
export const getAuthEmail = createSelector(getLoginState, fromLogin.getAuthEmail);

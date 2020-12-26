import {createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromLogin from '../reducers/bakery-login.reducer';


export const getBakeryLoginState = createSelector(
  fromFeature.getBakeryState,
  (state: fromFeature.BakeryState) => state.login
);

export const getPending = createSelector(getBakeryLoginState, fromLogin.getPending);
export const getLoggedIn = createSelector(getBakeryLoginState, fromLogin.getLoggedIn);

export const getAuthResponse = createSelector(getBakeryLoginState, fromLogin.getAuthResponse);

export const getToken = createSelector(getBakeryLoginState, fromLogin.getToken);
export const getAuthEmail = createSelector(getBakeryLoginState, fromLogin.getAuthEmail);

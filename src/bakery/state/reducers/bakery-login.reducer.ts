import {AuthResponse} from '../../../models/authResponse.model';
import * as fromLogin from '../actions/bakery-login.action';
import * as constants from 'src/constants';

export interface BakeryLoginState {
  pending: boolean;
  loggedIn: boolean;
  response: AuthResponse | null;
}

export const initialState: BakeryLoginState = {
  pending: false,
  loggedIn: false,
  response: null,
};

export function reducer(
  state = initialState,
  action: fromLogin.BakeryLoginAction
): BakeryLoginState {
  switch (action.type) {
    case fromLogin.LOGIN_BAKERY: {
      return {
        ...state,
        pending: true,
        loggedIn: false,
      };
    }
    case fromLogin.LOGIN_BAKERY_SUCCESS: {
      return {
        ...state,
        pending: false,
        loggedIn: true,
        response: action.payload,
      };
    }
    case fromLogin.LOGOUT_BAKERY_CONFIRM:
    case fromLogin.LOGIN_BAKERY_FAIL:
    {
      return {
        ...state,
        pending: false,
        loggedIn: false,
        response: null
      };
    }
    default:
      return state;
  }
}

export const getAuthResponse = (state: BakeryLoginState) => state.response;
export const getPending = (state: BakeryLoginState) => state.pending;
export const getLoggedIn = (state: BakeryLoginState) => state.loggedIn && state.response?.roles === constants.ROLE_BAKERY;
export const getToken = (state: BakeryLoginState) => state.response?.Authorization;
export const getAuthEmail = (state: BakeryLoginState) => state.response?.email;

import {AuthResponse} from '../../../models/authResponse.model';
import * as fromLogin from '../actions/buyerLoginAction';
import * as constants from 'src/constants';

export interface BuyerLoginState {
  pending: boolean;
  loggedIn: boolean;
  response: AuthResponse | null;
}

export const initialState: BuyerLoginState = {
  pending: false,
  loggedIn: false,
  response: null,
};

export function reducer(
  state = initialState,
  action: fromLogin.BuyerLoginAction
): BuyerLoginState {
  switch (action.type) {
    case fromLogin.BUYER_LOGIN: {
      return {
        ...state,
        pending: true,
        loggedIn: false,
      };
    }
    case fromLogin.BUYER_LOGIN_SUCCESS: {
      return {
        ...state,
        pending: false,
        loggedIn: true,
        response: action.payload,
      };
    }
    case fromLogin.BUYER_LOGOUT_CONFIRM:
    case fromLogin.BUYER_LOGIN_FAIL:
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

export const getAuthResponse = (state: BuyerLoginState) => state.response;
export const getPending = (state: BuyerLoginState) => state.pending;
export const getLoggedIn = (state: BuyerLoginState) => state.loggedIn && state.response?.roles === constants.ROLE_BUYER;
export const getToken = (state: BuyerLoginState) => state.response?.Authorization;
export const getAuthEmail = (state: BuyerLoginState) => state.response?.email;

import { AuthResponse } from './../../../models/authResponse.model';
import * as fromLogin from './../actions/login.action';

export interface LoginState {
  pending: boolean;
  loggedIn: boolean;
  response: AuthResponse | null;
}

export const initialState: LoginState = {
  pending: false,
  loggedIn: false,
  response: null,
};

export function reducer(
  state = initialState,
  action: fromLogin.LoginAction
): LoginState {
  switch (action.type) {
    case fromLogin.LOGIN: {
      return {
        ...state,
        pending: true,
        loggedIn: false,
      };
    }
    case fromLogin.LOGIN_SUCCESS: {
      const authResponse = action.payload;
      return {
        ...state,
        pending: false,
        loggedIn: true,
        response: authResponse,
      };
    }
    case fromLogin.LOGIN_FAIL: {
      return {
        ...state,
        pending: false,
        loggedIn: false,
      };
    }
  }
}

export const getAuthResponse = (state: LoginState) => state.response;
export const getPending = (state: LoginState) => state.pending;
export const getLoggedIn = (state: LoginState) => state.loggedIn;

import { Action } from '@ngrx/store';
import { AuthResponse } from '../../../models/authResponse.model';

export const BUYER_LOGIN = '[Buyer Login] Buyer Login';
export const BUYER_LOGIN_SUCCESS = '[Buyer Login] Buyer Login Success';
export const BUYER_LOGIN_FAIL = '[Buyer Login] Buyer Login Fail';

export const BUYER_LOGOUT = '[Buyer Logout] Buyer Logout';
export const BUYER_LOGOUT_CONFIRM = '[Buyer Logout] Buyer Logout Confirm';
export const BUYER_LOGOUT_CANCEL = '[Buyer Logout] Buyer Logout Cancel';

export class BuyerLogin implements Action {
  readonly type = BUYER_LOGIN;
  constructor(public payload: { email: string; password: string }) {}
}

export class BuyerLoginSuccess implements Action {
  readonly type = BUYER_LOGIN_SUCCESS;
  constructor(public payload: AuthResponse) {
    localStorage.setItem('token', payload.Authorization);
  }
}

export class BuyerLoginFail implements Action {
  readonly type = BUYER_LOGIN_FAIL;
  constructor(public payload: any) {}
}

export class BuyerLogout implements Action {
  readonly type = BUYER_LOGOUT;
}

export class BuyerLogoutConfirm implements Action {
  readonly type = BUYER_LOGOUT_CONFIRM;
}

export class BuyerLogoutCancel implements Action {
  readonly type = BUYER_LOGOUT_CANCEL;
}


export type BuyerLoginAction = BuyerLogin | BuyerLoginSuccess | BuyerLoginFail | BuyerLogout | BuyerLogoutConfirm | BuyerLogoutCancel;

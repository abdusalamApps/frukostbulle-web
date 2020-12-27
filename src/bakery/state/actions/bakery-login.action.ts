import { Action } from '@ngrx/store';
import { AuthResponse } from '../../../models/authResponse.model';

export const LOGIN_BAKERY = '[Login Bakery] Login Bakery';
export const LOGIN_BAKERY_SUCCESS = '[Login Bakery] Login Bakery Success';
export const LOGIN_BAKERY_FAIL = '[Login Bakery] Login Bakery Fail';

export const LOGOUT_BAKERY = '[Logout Bakery] Logout Bakery';
export const LOGOUT_BAKERY_CONFIRM = '[Logout Bakery] Logout Bakery Confirm';
export const LOGOUT_BAKERY_CANCEL = '[Logout Bakery] Logout Bakery Cancel';

export class LoginBakery implements Action {
  readonly type = LOGIN_BAKERY;
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginBakerySuccess implements Action {
  readonly type = LOGIN_BAKERY_SUCCESS;
  constructor(public payload: AuthResponse) {
    localStorage.setItem('token', payload.Authorization);
    console.log('login action: ' + payload.Authorization);
  }
}

export class LoginBakeryFail implements Action {
  readonly type = LOGIN_BAKERY_FAIL;
  constructor(public payload: any) {}
}

export class LogoutBakery implements Action {
  readonly type = LOGOUT_BAKERY;
}

export class LogoutBakeryConfirm implements Action {
  readonly type = LOGOUT_BAKERY_CONFIRM;
}

export class LogoutBakeryCancel implements Action {
  readonly type = LOGOUT_BAKERY_CANCEL;
}


export type BakeryLoginAction = LoginBakery | LoginBakerySuccess | LoginBakeryFail
            | LogoutBakery | LogoutBakeryConfirm | LogoutBakeryCancel;

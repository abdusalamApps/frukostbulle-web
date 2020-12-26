import { Action } from '@ngrx/store';
import { AuthResponse } from '../../../models/authResponse.model';

export const LOGIN = '[Login] Login';
export const LOGIN_SUCCESS = '[Login] Login Success';
export const LOGIN_FAIL = '[Login] Login Fail';

export const LOGOUT = '[Logout] Logout';
export const LOGOUT_CONFIRM = '[Logout] Logout Confirm';
export const LOGOUT_CANCEL = '[Logout] Logout Cancel';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: AuthResponse) {
    localStorage.setItem('token', payload.Authorization);
  }
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LogoutConfirm implements Action {
  readonly type = LOGOUT_CONFIRM;
}

export class LogoutCancel implements Action {
  readonly type = LOGOUT_CANCEL;
}


export type LoginAction = Login | LoginSuccess | LoginFail | Logout | LogoutConfirm | LogoutCancel;

import { AuthResponse } from '../../../models/authResponse.model';
import { Action } from '@ngrx/store';

export const SET_AUTHINTICATED = '[Auth] Set Authinticated';
export const SET_NOT_AUTHINTICATED = '[Auth] Set Not Authinticated';
export const CHECK_AUTHINTICATED = '[Auth] Check Authinticated';
export const CHECK_AUTHINTICATED_SUCCESS = '[Auth] Check Authinticated Success';
export const CHECK_AUTHINTICATED_FAIL = '[Auth] Check Authinticated Fail';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHINTICATED;
  constructor(public payload: AuthResponse) {}
}

export class SetNotAuthenticated implements Action {
  readonly type = SET_NOT_AUTHINTICATED;
}

export class CheckAuthenticated implements Action {
  readonly type = CHECK_AUTHINTICATED;
}

export class CheckAuthecticatedSuccess implements Action {
  readonly type = CHECK_AUTHINTICATED_SUCCESS;
}

export class CheckAuthecticatedFail implements Action {
  readonly type = CHECK_AUTHINTICATED_FAIL;
  constructor(public payload: any) {}
}

export type AuthAction =
  | SetAuthenticated
  | SetNotAuthenticated
  | CheckAuthenticated
  | CheckAuthecticatedSuccess
  | CheckAuthecticatedFail;

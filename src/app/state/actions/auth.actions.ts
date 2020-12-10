import { AuthResponse } from '../../../models/authResponse.model';
import { Action } from '@ngrx/store';

export const SET_AUTHINTICATED = '[Auth] Set Authinticated';
export const SET_NOT_AUTHINTICATED = '[Auth] Set Not Authinticated';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHINTICATED;
  constructor(public payload: AuthResponse) {}
}

export class SetNotAuthenticated implements Action {
  readonly type = SET_NOT_AUTHINTICATED;
}

export type AuthAction = SetAuthenticated | SetNotAuthenticated;

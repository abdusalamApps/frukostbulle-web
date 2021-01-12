import {Action} from '@ngrx/store';
import {UseridPassword} from '../../../models/useridPassword.model';

export const CHECK_PASSWORD = '[Password] Check Password';
export const CHECK_PASSWORD_SUCCESS = '[Password] Check Password Success';
export const CHECK_PASSWORD_FAIL = '[Password] Check Password Fail';

export const UPDATE_PASSWORD = '[Password] Update Password';
export const UPDATE_PASSWORD_SUCCESS = '[Password] Update Password Success';
export const UPDATE_PASSWORD_FAIL = '[Password] Update Password Fail';

// Action to check if a given password is correct for the logged in user
export class CheckPassword implements Action {
  readonly type = CHECK_PASSWORD;

  constructor(public payload: UseridPassword) {
  }
}

export class CheckPasswordSuccess implements Action {
  readonly type = CHECK_PASSWORD_SUCCESS;
  constructor(public payload: boolean) {
  }

}

export class CheckPasswordFail implements Action {
  readonly type = UPDATE_PASSWORD_FAIL;

  constructor(public payload: any) {
  }
}

// Action to update the logged in user password
export class UpdatePassword implements Action {
  readonly type = UPDATE_PASSWORD;

  constructor(public payload: UseridPassword) {
  }
}

export class UpdatePasswordSuccess implements Action {
  readonly type = UPDATE_PASSWORD_SUCCESS;
}

export class UpdatePasswordFail implements Action {
  readonly type = UPDATE_PASSWORD_FAIL;

  constructor(public payload: any) {
  }
}

export type PasswordAction = UpdatePassword | UpdatePasswordSuccess | UpdatePasswordFail;

import {Action} from '@ngrx/store';
import {User} from '../../../models/user.model';

export const LOAD_USER_BUY_ID = '[User] Load User By Id';
export const LOAD_USER_BUY_ID_SUCCESS = '[User] Load User By Id Success';
export const LOAD_USER_BUY_ID_FAIL = '[User] Load User By Id Fail';

export class LoadUserById implements Action {
  readonly type = LOAD_USER_BUY_ID;

  constructor(public payload: number) {
  }
}

export class LoadUserByIdSuccess implements Action {
  readonly type = LOAD_USER_BUY_ID_SUCCESS;

  constructor(public payload: User) {
  }
}

export class LoadUserByIdFail implements Action {
  readonly type = LOAD_USER_BUY_ID_FAIL;

  constructor(public payload: any) {
  }
}

export type UserAction = LoadUserById | LoadUserByIdSuccess | LoadUserByIdFail;




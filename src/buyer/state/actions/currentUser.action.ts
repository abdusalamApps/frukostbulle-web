import {Action} from '@ngrx/store';
import {User} from '../../../models/user.model';

export const LOAD_CURRENT_USER = '[Current User] Load Current User';
export const LOAD_CURRENT_USER_SUCCESS = '[Current User] Load Current User Success';
export const LOAD_CURRENT_USER_FAIL = '[Current User] Load Current User Fail';

export const LOAD_CURRENT_USER_SELLER = '[Current User] Load Current User Seller';
export const LOAD_CURRENT_USER_SELLER_SUCCESS = '[Current User] Load Current User Seller Success';
export const LOAD_CURRENT_USER_SELLER_FAIL = '[Current User] Load Current User Seller Fail';

export const UPDATE_USER = '[Current User] Update User';
export const UPDATE_USER_SUCCESS = '[Current User] Update User Success';
export const UPDATE_USER_FAIL = '[Current User] Update User Fail';

export const UPDATE_SELLER = '[Current User] Update Seller';
export const UPDATE_SELLER_SUCCESS = '[Current User] Update Seller Success';
export const UPDATE_SELLER_FAIL = '[Current User] Update Seller Fail';

export class LoadCurrentUser implements Action {
  readonly type = LOAD_CURRENT_USER;

  // payload == current user's email
  constructor(public payload: string) {

  }
}

export class LoadCurrentUserSuccess implements Action {
  readonly type = LOAD_CURRENT_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class LoadCurrentUserFail implements Action {
  readonly type = LOAD_CURRENT_USER_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadCurrentUserSeller implements Action {
  readonly type = LOAD_CURRENT_USER_SELLER;

  constructor(public payload: number) {
  }
}

export class LoadCurrentUserSellerSuccess implements Action {
  readonly type = LOAD_CURRENT_USER_SELLER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class LoadCurrentUserSellerFail implements Action {
  readonly type = LOAD_CURRENT_USER_SELLER_FAIL;

  constructor(public payload: any) {
  }
}


export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: User) {
  }
}

export class UpdateUserSuccess implements Action {
  readonly type = UPDATE_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class UpdateUserFail implements Action {
  readonly type = UPDATE_USER_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateSeller implements Action {
  readonly type = UPDATE_SELLER;

  constructor(public payload: { buyerId: number, seller: User }) {
  }
}

export class UpdateSellerSuccess implements Action {
  readonly type = UPDATE_SELLER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class UpdateSellerFail implements Action {
  readonly type = UPDATE_SELLER_FAIL;

  constructor(public payload: any) {
  }
}

export type CurrentUserAction =
  | LoadCurrentUser | LoadCurrentUserSuccess | LoadCurrentUserFail
  | UpdateUser | UpdateUserSuccess | UpdateUserFail
  | UpdateSeller | UpdateSellerSuccess | UpdateSellerFail
  | LoadCurrentUserSeller | LoadCurrentUserSellerSuccess | LoadCurrentUserSellerFail ;

import {Action} from '@ngrx/store';
import {User} from '../../../models/user.model';

export const BUYER_LOAD_CURRENT_USER = '[Buyer Current User] Buyer Load Current User';
export const BUYER_LOAD_CURRENT_USER_SUCCESS = '[Buyer Current User] Buyer Load Current User Success';
export const BUYER_LOAD_CURRENT_USER_FAIL = '[Buyer Current User] Buyer Load Current User Fail';

export const BUYER_LOAD_CURRENT_USER_SELLER = '[BuyerCurrent User] Buyer Load Current User Seller';
export const BUYER_LOAD_CURRENT_USER_SELLER_SUCCESS = '[Buyer Current User] Buyer Load Current User Seller Success';
export const BUYER_LOAD_CURRENT_USER_SELLER_FAIL = '[Buyer Current User] Buyer Load Current User Seller Fail';

export const BUYER_UPDATE_USER = '[Buyer Current User] Buyer Update User';
export const BUYER_UPDATE_USER_SUCCESS = '[Buyer Current User] Buyer Update User Success';
export const BUYER_UPDATE_USER_FAIL = '[Buyer Current User] Buyer Update User Fail';

export const BUYER_UPDATE_SELLER = '[Buyer Current User] Buyer Update Seller';
export const BUYER_UPDATE_SELLER_SUCCESS = '[Buyer Current User] Buyer Update Seller Success';
export const BUYER_UPDATE_SELLER_FAIL = '[Buyer Current User] Buyer Update Seller Fail';

export const SET_REMINDER = '[Reminder] Set Reminder';
export const SET_REMINDER_SUCCESS = '[Reminder] Set Reminder Success';
export const SET_REMINDER_FAIL = '[Reminder] Set Reminder Fail';


export class BuyerLoadCurrentUser implements Action {
  readonly type = BUYER_LOAD_CURRENT_USER;

  // payload == current user's email
  constructor(public payload: string) {
  }
}

export class BuyerLoadCurrentUserSuccess implements Action {
  readonly type = BUYER_LOAD_CURRENT_USER_SUCCESS;

  constructor(public payload: User) {

  }
}

export class BuyerLoadCurrentUserFail implements Action {
  readonly type = BUYER_LOAD_CURRENT_USER_FAIL;

  constructor(public payload: any) {
  }
}

export class BuyerLoadCurrentUserSeller implements Action {
  readonly type = BUYER_LOAD_CURRENT_USER_SELLER;

  constructor(public payload: number) {
  }
}

export class BuyerLoadCurrentUserSellerSuccess implements Action {
  readonly type = BUYER_LOAD_CURRENT_USER_SELLER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class BuyerLoadCurrentUserSellerFail implements Action {
  readonly type = BUYER_LOAD_CURRENT_USER_SELLER_FAIL;

  constructor(public payload: any) {
  }
}


export class BuyerUpdateUser implements Action {
  readonly type = BUYER_UPDATE_USER;

  constructor(public payload: User) {
  }
}

export class BuyerUpdateUserSuccess implements Action {
  readonly type = BUYER_UPDATE_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class BuyerUpdateUserFail implements Action {
  readonly type = BUYER_UPDATE_USER_FAIL;

  constructor(public payload: any) {
  }
}

export class BuyerUpdateSeller implements Action {
  readonly type = BUYER_UPDATE_SELLER;

  constructor(public payload: { buyerId: number, sellerId: number }) {
  }
}

export class BuyerUpdateSellerSuccess implements Action {
  readonly type = BUYER_UPDATE_SELLER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class BuyerUpdateSellerFail implements Action {
  readonly type = BUYER_UPDATE_SELLER_FAIL;

  constructor(public payload: any) {
  }
}

export class SetReminder implements Action {
  readonly type = SET_REMINDER;

  constructor(public payload: User) {
  }
}

export class SetReminderSuccess implements Action {
  readonly type = SET_REMINDER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class SetReminderFail implements Action {
  readonly type = SET_REMINDER_FAIL;

  constructor(public payload: any) {
  }
}

export type BuyerCurrentUserAction =
  | BuyerLoadCurrentUser | BuyerLoadCurrentUserSuccess | BuyerLoadCurrentUserFail
  | BuyerUpdateUser | BuyerUpdateUserSuccess | BuyerUpdateUserFail
  | BuyerUpdateSeller | BuyerUpdateSellerSuccess | BuyerUpdateSellerFail
  | BuyerLoadCurrentUserSeller | BuyerLoadCurrentUserSellerSuccess | BuyerLoadCurrentUserSellerFail
  | SetReminder | SetReminderSuccess | SetReminderFail;

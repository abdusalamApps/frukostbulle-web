import {User} from '../../../models/user.model';
import {LOAD_USER_BUY_ID, LOAD_USER_BUY_ID_FAIL, LOAD_USER_BUY_ID_SUCCESS} from '../../../seller/state';

export const LOAD_SELLER = '[load seller] load seller';
export const LOAD_SELLER_SUCCESS = '[load seller] load seller';
export const LOAD_SELLER_FAIL = '[load seller] load seller';


export class LoadSeller {
  readonly type = LOAD_USER_BUY_ID;

  constructor(public payload: number) {
  }
}

export class LoadSellerSuccess {
  readonly type = LOAD_USER_BUY_ID_SUCCESS;

  constructor(public payload: User) {}

}

export class LoadSellerFail {
  readonly type = LOAD_USER_BUY_ID_FAIL;

  constructor(public payload: any) {
  }
}

export type sellerAction = LoadSeller | LoadSellerFail | LoadSellerSuccess;



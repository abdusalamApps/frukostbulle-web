import {Action} from '@ngrx/store';
import {User} from '../../../models/user.model';

export const LOAD_SELECTED_SELLER = '[Selected Seller] Load Selected Seller';
export const LOAD_SELECTED_SELLER_SUCCESS = '[Selected Seller] Load Selected Seller Success';
export const LOAD_SELECTED_SELLER_FAIL = '[Selected Seller] Load Selected Seller Fail';

export class LoadSelectedSeller {
  readonly type = LOAD_SELECTED_SELLER;

  constructor(public payload: number) {
  }
}

export class LoadSelectedSellerSuccess {
  readonly type = LOAD_SELECTED_SELLER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class LoadSelectedSellerFail {
  readonly type = LOAD_SELECTED_SELLER_FAIL;

  constructor(public payload: any) {
  }
}

export type SelectedSellerAction = LoadSelectedSeller | LoadSelectedSellerSuccess | LoadSelectedSellerFail;




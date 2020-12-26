import {Action} from '@ngrx/store';
import {User} from '../../../models/user.model';
import {Bakery} from '../../../models/bakery.model';

export const LOAD_SELLERS = '[Sellers] Load Sellers';
export const LOAD_SELLER_SUCCESS = '[Sellers] Load Sellers Success';
export const LOAD_SELLERS_FAIL = '[Sellers] Load Sellers Fail';

export const LOAD_BUYERS = '[Buyers] Load Buyers';
export const LOAD_BUYERS_SUCCESS = '[Buyers] Load Buyers Success';
export const LOAD_BUYERS_FAIL = '[Buyers] Load Buyers Fail';

export const LOAD_BAKERIES = '[Bakeries] Load Bakeries';
export const LOAD_BAKERIES_SUCCESS = '[Bakeries] Load Bakeries Success';
export const LOAD_BAKERIES_FAIL = '[Bakeries] Load Bakeries Fail';

export class LoadSellers implements Action {
  readonly type = LOAD_SELLERS;

}

export class LoadSellersSuccess implements Action {
  readonly type = LOAD_SELLER_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class LoadSellersFail implements Action {
  readonly type = LOAD_SELLERS_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadBuyers implements Action {
  readonly type = LOAD_BUYERS;
}

export class LoadBuyersSuccess implements Action {
  readonly type = LOAD_BUYERS_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class LoadBuyersFail implements Action {
  readonly type = LOAD_BUYERS_FAIL;

  constructor(public payload: any) {
  }
}
export class LoadBakeries implements Action {
  readonly type = LOAD_BAKERIES;

}

export class LoadBakeriesSuccess implements Action {
  readonly type = LOAD_BAKERIES_SUCCESS;

  constructor(public payload: Bakery[]) {
  }
}

export class LoadBakeriesFail implements Action {
  readonly type = LOAD_BAKERIES_FAIL;

  constructor(public payload: any) {
  }
}




export type UsersActions =
  | LoadBakeries | LoadBakeriesSuccess | LoadBakeriesFail
  | LoadBuyers | LoadBuyersSuccess | LoadBuyersFail
  | LoadSellers | LoadSellersSuccess | LoadSellersFail;

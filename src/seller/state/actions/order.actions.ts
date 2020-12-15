import {Action} from '@ngrx/store';
import {Order} from '../../../models/order.model';

export const LOAD_SELLER_ORDERS = '[Order] Load Seller Orders';
export const LOAD_SELLER_ORDERS_SUCCESS = '[Order] Load Seller Orders Success';
export const LOAD_SELLER_ORDERS_FAIL = '[Order] Load Seller Orders Fail';

export class LoadSellerOrders implements Action {
  readonly type = LOAD_SELLER_ORDERS;

  constructor(public payload: number) {
  }
}

export class LoadSellerOrdersSuccess implements Action {
  readonly type = LOAD_SELLER_ORDERS_SUCCESS;

  constructor(public payload: Order[]) {
  }
}

export class LoadSellerOrdersFail implements Action {
  readonly type = LOAD_SELLER_ORDERS_FAIL;

  constructor(public payload: any) {
  }
}

export type OrderActions = LoadSellerOrders | LoadSellerOrdersFail | LoadSellerOrdersSuccess;

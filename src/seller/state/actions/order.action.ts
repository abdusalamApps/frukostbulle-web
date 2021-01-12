import {Action} from '@ngrx/store';
import {Order} from '../../../models/order.model';
import {OrderHistory} from '../../../models/order-history.model';

export const LOAD_SELLER_ORDERS = '[Order] Load Seller Orders';
export const LOAD_SELLER_ORDERS_SUCCESS = '[Order] Load Seller Orders Success';
export const LOAD_SELLER_ORDERS_FAIL = '[Order] Load Seller Orders Fail';

export const LOAD_ORDER_HISTORY = '[Order] Load Order History';
export const LOAD_ORDER_HISTORY_SUCCESS = '[Order] Load Order History Success';
export const LOAD_ORDER_HISTORY_FAIL = '[Order] Load Order History Fail';

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

export class LoadOrderHistory implements Action {
  readonly type = LOAD_ORDER_HISTORY;

  constructor(public payload: number) {
  }
}

export class LoadOrderHistorySuccess implements Action {
  readonly type = LOAD_ORDER_HISTORY_SUCCESS;

  constructor(public payload: OrderHistory[]) {
  }
}

export class LoadOrderHistoryFail implements Action {
  readonly type = LOAD_ORDER_HISTORY_FAIL;

  constructor(public payload: any) {
  }
}


export type OrderAction =
  | LoadSellerOrders | LoadSellerOrdersFail | LoadSellerOrdersSuccess
  | LoadOrderHistory | LoadOrderHistorySuccess | LoadOrderHistoryFail;

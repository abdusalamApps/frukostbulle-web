import {Action} from '@ngrx/store';
import {Order} from '../../../models/order.model';

export const LOAD_BUYER_ORDERS = '[Order] Load Buyer Orders';
export const LOAD_BUYER_ORDERS_SUCCESS = '[Order] Load Buyer Orders Success';
export const LOAD_BUYER_ORDERS_FAIL = '[Order] Load Buyer Orders Fail';

export const LOAD_BUYER_ORDER_HISTORY = '[Order] Load Buyer Order History';
export const LOAD_BUYER_ORDER_HISTORY_SUCCESS = '[Order] Load Buyer Order History Success';
export const LOAD_BUYER_ORDER_HISTORY_FAIL = '[Order] Load Buyer Order History Fail';

export class LoadBuyerOrders implements Action {
  readonly type = LOAD_BUYER_ORDERS;

  constructor(public payload: number) {
  }
}

export class LoadBuyerOrdersSuccess implements Action {
  readonly type = LOAD_BUYER_ORDERS_SUCCESS;

  constructor(public payload: Order[]) {
  }
}

export class LoadBuyerOrdersFail implements Action {
  readonly type = LOAD_BUYER_ORDERS_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadBuyerOrderHistory implements Action {
  readonly type = LOAD_BUYER_ORDER_HISTORY;

  constructor(public payload: number) {
  }
}

export class LoadBuyerOrderHistorySuccess implements Action {
  readonly type = LOAD_BUYER_ORDER_HISTORY_SUCCESS;

  constructor(public payload: Order[]) {
  }
}

export class LoadBuyerOrderHistoryFail implements Action {
  readonly type = LOAD_BUYER_ORDER_HISTORY_FAIL;

  constructor(public payload: any) {
  }
}


export type OrderActions =
  | LoadBuyerOrders | LoadBuyerOrdersFail | LoadBuyerOrdersSuccess
  | LoadBuyerOrderHistory | LoadBuyerOrderHistorySuccess | LoadBuyerOrderHistoryFail;

import {Action} from '@ngrx/store';
import {Order} from '../../../models/order.model';
import {OrderHistory} from '../../../models/order-history.model';

export const LOAD_BUYER_ORDERS = '[Order] Load Buyer Orders';
export const LOAD_BUYER_ORDERS_SUCCESS = '[Order] Load Buyer Orders Success';
export const LOAD_BUYER_ORDERS_FAIL = '[Order] Load Buyer Orders Fail';

export const LOAD_BUYER_ORDER_HISTORY = '[Order] Load Buyer Order History';
export const LOAD_BUYER_ORDER_HISTORY_SUCCESS = '[Order] Load Buyer Order History Success';
export const LOAD_BUYER_ORDER_HISTORY_FAIL = '[Order] Load Buyer Order History Fail';

export const INSERT_ORDER = '[Order] Insert Order';
export const INSERT_ORDER_SUCCESS = '[Order] Insert Order Success';
export const INSERT_ORDER_FAIL = '[Order] Insert Order Fail';

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

  constructor(public payload: OrderHistory[]) {
  }
}

export class LoadBuyerOrderHistoryFail implements Action {
  readonly type = LOAD_BUYER_ORDER_HISTORY_FAIL;

  constructor(public payload: any) {
  }
}

export class InsertOrder implements Action {
  readonly type = INSERT_ORDER;

  constructor(public payload: Order) {
  }
}

export class InsertOrderSuccess implements Action {
  readonly type = INSERT_ORDER_SUCCESS;

  constructor(public payload: Order) {
    localStorage.removeItem('cart');
  }
}

export class InsertOrderFail implements Action {
  readonly type = INSERT_ORDER_FAIL;

  constructor(public payload: any) {
    console.log(`insert order fail ${JSON.stringify(payload)}`);
  }
}


export type OrderActions =
  | LoadBuyerOrders | LoadBuyerOrdersFail | LoadBuyerOrdersSuccess
  | LoadBuyerOrderHistory | LoadBuyerOrderHistorySuccess | LoadBuyerOrderHistoryFail
  | InsertOrder | InsertOrderSuccess | InsertOrderFail;

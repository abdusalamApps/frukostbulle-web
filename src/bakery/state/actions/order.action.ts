import {Action} from '@ngrx/store';
import {Order} from '../../../models/order.model';

export const LOAD_BAKERY_ORDERS = '[Order] Load Bakery Orders';
export const LOAD_BAKERY_ORDERS_SUCCESS = '[Order] Load Bakery Orders Success';
export const LOAD_BAKERY_ORDERS_FAIL = '[Order] Load Bakery Orders Fail';

export const LOAD_ORDER_HISTORY = '[Order] Load Order History';
export const LOAD_ORDER_HISTORY_SUCCESS = '[Order] Load Order History Success';
export const LOAD_ORDER_HISTORY_FAIL = '[Order] Load Order History Fail';

export class LoadBakeryOrders implements Action {
  readonly type = LOAD_BAKERY_ORDERS;

  constructor(public payload: number) {
  }
}

export class LoadBakeryOrdersSuccess implements Action {
  readonly type = LOAD_BAKERY_ORDERS_SUCCESS;

  constructor(public payload: Order[]) {
  }
}

export class LoadBakeryOrdersFail implements Action {
  readonly type = LOAD_BAKERY_ORDERS_FAIL;

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

  constructor(public payload: Order[]) {
  }
}

export class LoadOrderHistoryFail implements Action {
  readonly type = LOAD_ORDER_HISTORY_FAIL;

  constructor(public payload: any) {
  }
}


export type OrderActions =
  | LoadBakeryOrders | LoadBakeryOrdersFail | LoadBakeryOrdersSuccess
  | LoadOrderHistory | LoadOrderHistorySuccess | LoadOrderHistoryFail;

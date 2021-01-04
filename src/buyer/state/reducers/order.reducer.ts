import * as orderActions from '../actions/order.action';
import {Order} from '../../../models/order.model';
import {OrderHistory} from '../../../models/order-history.model';

export interface OrderState {
  entities: { [orderId: number]: Order };
  ordersLoaded: boolean;
  ordersLoading: boolean;
  orderHistory: { [orderId: number]: OrderHistory };
}

export const initialState: OrderState = {
  entities: {},
  ordersLoaded: false,
  ordersLoading: false,
  orderHistory: {},
};

export function reducer(
  state = initialState,
  action: orderActions.OrderActions
): OrderState {
  switch (action.type) {
    case orderActions.LOAD_BUYER_ORDERS: {
      return {
        ...state,
        ordersLoaded: false,
        ordersLoading: true,
      };
    }
    case orderActions.LOAD_BUYER_ORDERS_SUCCESS: {
      const entities = action.payload.reduce(
        (newEns: { [id: number]: Order }, order) => {
          return {
            ...newEns,
            [order.id]: order,
          };
        }, {}
      );
      return {
        ...state,
        entities,
        ordersLoaded: true,
        ordersLoading: false,
      };
    }
    case orderActions.LOAD_BUYER_ORDERS_FAIL: {
      return {
        ...state,
        ordersLoaded: false,
        ordersLoading: false,
      };
    }
    case orderActions.LOAD_BUYER_ORDER_HISTORY_SUCCESS: {
      const entities = action.payload.reduce(
        (newEns: { [id: number]: OrderHistory }, order) => {
          return {
            ...newEns,
            [order.orderId]: order,
          };
        }, {}
      );
      return {
        ...state,
        orderHistory: entities
      };
    }
    default:
      return state;
  }
}

export const getBuyerOrdersEntities = (state: OrderState) => state.entities;
export const getBuyerOrdersLoaded = (state: OrderState) => state.ordersLoaded;
export const getBuyerOrdersLoading = (state: OrderState) => state.ordersLoading;
export const getBuyerOrderHistory = (state: OrderState) => state.orderHistory;

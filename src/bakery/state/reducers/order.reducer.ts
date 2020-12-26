import * as orderActions from '../actions/order.action';
import {Order} from '../../../models/order.model';

export interface OrderState {
  entities: { [sellerId: number]: Order };
  ordersLoaded: boolean;
  ordersLoading: boolean;
  orderHistory: { [sellerId: number]: Order };
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
    case orderActions.LOAD_BAKERY_ORDERS: {
      return {
        ...state,
        ordersLoaded: false,
        ordersLoading: true,
      };
    }
    case orderActions.LOAD_BAKERY_ORDERS_SUCCESS: {
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
    case orderActions.LOAD_BAKERY_ORDERS_FAIL: {
      return {
        ...state,
        ordersLoaded: false,
        ordersLoading: false,
      };
    }
    case orderActions.LOAD_ORDER_HISTORY_SUCCESS: {
      const entities = action.payload.reduce(
        (newEns: { [id: number]: Order }, order) => {
          return {
            ...newEns,
            [order.sellerId]: order,
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

export const getBakeryOrdersEntities = (state: OrderState) => state.entities;
export const getBakeryOrdersLoaded = (state: OrderState) => state.ordersLoaded;
export const getBakeryOrdersLoading = (state: OrderState) => state.ordersLoading;
export const getOrderHistory = (state: OrderState) => state.orderHistory;

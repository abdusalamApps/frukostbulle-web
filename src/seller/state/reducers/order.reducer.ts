import * as orderActions from '../actions/order.actions';
import {Order} from '../../../models/order.model';

export interface OrderState {
  entities: { [orderId: number]: Order }
  ordersLoaded: boolean;
  ordersLoading: boolean;
}

export const initialState: OrderState = {
  entities: {},
  ordersLoaded: false,
  ordersLoading: false,
};

export function reducer(
  state = initialState,
  action: orderActions.OrderActions
): OrderState {
  switch (action.type) {
    case orderActions.LOAD_SELLER_ORDERS: {
      return {
        ...state,
        ordersLoaded: false,
        ordersLoading: true,
      };
    }
    case orderActions.LOAD_SELLER_ORDERS_SUCCESS: {
      const orders = action.payload;
      const entities = orders.reduce(
        (newEns: { [id: number]: Order }, order) => {
          return {
            ...newEns,
            [order.id]: order,
          };
        }, {}
      );
      return {
        entities,
        ordersLoaded: true,
        ordersLoading: false,
      };
    }
    case orderActions.LOAD_SELLER_ORDERS_FAIL: {
      return {
        ...state,
        ordersLoaded: false,
        ordersLoading: false,
      };
    }
    default:
      return state;
  }
}

export const getSellerOrdersEntities = (state: OrderState) => state.entities;
export const getSellerOrdersLoaded = (state: OrderState) => state.ordersLoaded;
export const getSellerOrdersLoading = (state: OrderState) => state.ordersLoading;

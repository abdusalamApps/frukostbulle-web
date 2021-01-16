import {createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromOrder from '../reducers/order.reducer';
import * as fromRoot from '../../../app/state';
import {Order} from '../../../models/order.model';

export const getOrderState = createSelector(
  fromFeature.getSellerState,
  (state: fromFeature.SellerState) => state.orders
);

export const getOrderEntities = createSelector(
  getOrderState,
  fromOrder.getSellerOrdersEntities
);

export const getSelectedOrder = createSelector(
  getOrderEntities,
  fromRoot.getRouterState,
  (entities, router): Order => {
    return router.state && entities[router.state.params.orderId];
  }
);

export const getSellerOrders = createSelector(
  getOrderEntities,
  (entities) => {

    let array = Object.keys(entities).map((id) => {
      return entities[parseInt(id, 10)];
    });
    array.sort(compare);
    return array;
  }
);

function compare(a: Order, b: Order) {
  if (a.deliveryDate < b.deliveryDate) {
    return -1;
  }
  if (a.deliveryDate > b.deliveryDate) {
    return 1;
  }
  return 0;
}

export const getOrderTotal = createSelector(
  getOrderEntities,
  (entities: { [p: number]: Order }, props: any) => {
    let total = 0;
    for (const contentItem of
      entities[props.orderId].content[Symbol.iterator]()) {
      total += contentItem.item.price * contentItem.amount;
    }
    return total;
  }
);

export const getOrdersLoaded = createSelector(
  getOrderState,
  fromOrder.getSellerOrdersLoaded
);

export const getOrderLoading = createSelector(
  getOrderState,
  fromOrder.getSellerOrdersLoading
);

export const getOrderHistoryEntities = createSelector(
  getOrderState,
  fromOrder.getOrderHistory
);

export const getOrderHistory = createSelector(
  getOrderHistoryEntities, (entities) => {
    return Object.keys(entities).map((id) => {
      return entities[parseInt(id, 10)];
    });
  }
);

export const getStatistics = createSelector(
  getOrderHistory, (orders) => {
    let statistics: { name: string, value: number }[] = [];
    let date = new Date(orders[0].deliveryDate);

  }
);

import {createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromOrder from '../reducers/order.reducer';
import * as fromRoot from '../../../app/state';
import {Order} from '../../../models/order.model';

export const getOrderState = createSelector(
  fromFeature.getBuyerState,
  (state: fromFeature.BuyerState) => state.orders
);

export const getOrderEntities = createSelector(
  getOrderState,
  fromOrder.getBuyerOrdersEntities
);

export const getBuyerSelectedOrder = createSelector(
  getOrderEntities,
  fromRoot.getRouterState,
  (entities, router): Order => {
    return router.state && entities[router.state.params.orderId];
  }
);


export const getBuyerOrders = createSelector(
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


export const getBuyerOrderTotal = createSelector(
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
export const getBuyerOrdersLoaded = createSelector(
  getOrderState,
  fromOrder.getBuyerOrdersLoaded
);

export const getBuyerOrderLoading = createSelector(
  getOrderState,
  fromOrder.getBuyerOrdersLoading
);

export const getBuyerOrderHistoryEntities = createSelector(
  getOrderState,
  fromOrder.getBuyerOrderHistory
);

export const getBuyerOrderHistory = createSelector(
  getBuyerOrderHistoryEntities, (entities) => {
    return Object.keys(entities).map((id) => {
      return entities[parseInt(id, 10)];
    });
  }
);

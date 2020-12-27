import {createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromOrder from '../reducers/order.reducer';
import * as fromRoot from '../../../app/state';
import {Order} from '../../../models/order.model';

export const getOrderState = createSelector(
  fromFeature.getBakeryState,
  (state: fromFeature.BakeryState) => state.orders
);

export const getOrderEntities = createSelector(
  getOrderState,
  fromOrder.getBakeryOrdersEntities
);

export const getSelectedOrder = createSelector(
  getOrderEntities,
  fromRoot.getRouterState,
  (entities, router): Order => {
    return router.state && entities[router.state.params.orderId];
  }
);

export const getBakeryOrders = createSelector(
  getOrderEntities, (entities) => {
    return Object.keys(entities).map((id) => {
      return entities[parseInt(id, 10)];
    });
  }
);

  export const getOrderTotal = createSelector(
    getOrderEntities,
  (entities: { [p: number]: Order }, props: any) => {
    let total = 0;

  /*  for (const contentItem of
      entities[props.orderId].content[Symbol.iterator]()) {
      total += contentItem.item.price * contentItem.amount;
    }*/
    return total;
  }
);

export const getOrdersLoaded = createSelector(
  getOrderState,
  fromOrder.getBakeryOrdersLoaded
);

export const getOrderLoading = createSelector(
  getOrderState,
  fromOrder.getBakeryOrdersLoading
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

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
  getOrderEntities, (entities) => {
    return Object.keys(entities).map((id) => {
      return entities[parseInt(id, 10)];
    });
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

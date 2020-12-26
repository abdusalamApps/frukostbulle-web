import {createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromLoadUsers from '../reducers/loadUsers.reducer';
import * as fromRoot from '../../../app/state';
import {User} from '../../../models/user.model';
import {Bakery} from '../../../models/bakery.model';
import {getOrderEntities, getOrderState} from '../../../bakery/state';
import * as fromOrder from '../../../bakery/state/reducers/order.reducer';
import {Order} from '../../../models/order.model';

export const getLoadUsersState = createSelector(
  fromFeature.getAdminState,
  (state: fromFeature.AdminState) => state.loadUsers
);


export const getBakeriesEntities = createSelector(
  getLoadUsersState,
  fromLoadUsers.getBakeries
);
export const getBuyersEntities = createSelector(
  getLoadUsersState,
  fromLoadUsers.getBuyers
);
export const getSellersEntities = createSelector(
  getLoadUsersState,
  fromLoadUsers.getSellers
);

export const getSelectedBakery = createSelector(
  getBakeriesEntities,
  fromRoot.getRouterState,
  (entities, router): Bakery => {
    return router.state && entities[router.state.params.bakeryId];
  }
);

export const getSelectedBuyer = createSelector(
  getBuyersEntities,
  fromRoot.getRouterState,
  (entities, router): User => {
    return router.state && entities[router.state.params.buyerId];
  }
);
export const getSelectedSeller = createSelector(
  getSellersEntities,
  fromRoot.getRouterState,
  (entities, router): User => {
    return router.state && entities[router.state.params.sellerId];
  }
);
export const getBakeriesLoaded = createSelector(
  getLoadUsersState,
  fromLoadUsers.getBakeriesLoaded
);

export const getBakeriesLoading = createSelector(
  getLoadUsersState,
  fromLoadUsers.getBakeriesLoading
);
export const getSellersLoaded = createSelector(
  getLoadUsersState,
  fromLoadUsers.getSellersLoaded
);

export const getSellersLoading = createSelector(
  getLoadUsersState,
  fromLoadUsers.getBakeriesLoading
);
export const getBuyersLoaded = createSelector(
  getLoadUsersState,
  fromLoadUsers.getBuyersLoaded
);

export const getBuyersLoading = createSelector(
  getLoadUsersState,
  fromLoadUsers.getetBuyersLoading
);

export const getBakeries = createSelector(
  getBakeriesEntities, (entities) => {
    return Object.keys(entities).map((id) => {
      return entities[parseInt(id, 10)];
    });
  }
);
export const getBuyers = createSelector(
  getBuyersEntities, (entities) => {
    return Object.keys(entities).map((id) => {
      return entities[parseInt(id, 10)];
    });
  }
);
export const getSellers = createSelector(
  getSellersEntities, (entities) => {
    return Object.keys(entities).map((id) => {
      return entities[parseInt(id, 10)];
    });
  }
);

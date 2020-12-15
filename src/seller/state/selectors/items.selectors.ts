import {createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromItems from '../reducers/items.reducer';
import * as fromRoot from '../../../app/state';
import {Item} from '../../../models/item.model';

export const getItemState = createSelector(
  fromFeature.getSellerState,
  (state: fromFeature.SellerState) => state.items
);

export const getItemsEntities = createSelector(
  getItemState,
  fromItems.getItemsEntities
);

export const getSelectedItem = createSelector(
  getItemsEntities,
  fromRoot.getRouterState,
  (entities, router): Item => {
    return router.state && entities[router.state.params.itemId];
  }
);

export const getAllItems = createSelector(
  getItemsEntities, (entities) => {
  return Object.keys(entities).map((id) => {
    return entities[parseInt(id, 10)];
  });
});

export const getItemsLoaded = createSelector(
  getItemState,
  fromItems.getItemsLoaded
);

export const getItemsLoading = createSelector(
  getItemState,
  fromItems.getItemsLoading
);

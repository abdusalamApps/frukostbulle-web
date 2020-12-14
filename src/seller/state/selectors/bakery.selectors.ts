import {createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromBakery from '../reducers/bakery.reducer';

export const getBakeryState = createSelector(
  fromFeature.getSellerState,
  (state: fromFeature.SellerState) => state.bakeries
);

export const getBakeryEntities = createSelector(
  getBakeryState,
  fromBakery.getBakeryEntities
);

export const getAllBakeries = createSelector(getBakeryEntities,
  (entities) => {
    return Object.keys(entities).map((bakeryId) => {
      return entities[parseInt(bakeryId, 10)];
    });
  });

export const getBakeriesLoaded = createSelector(
  getBakeryState,
  fromBakery.getBakeryLoaded
);

export const getBakeriesLoading = createSelector(
  getBakeryState,
  fromBakery.getBakeryLoading
);

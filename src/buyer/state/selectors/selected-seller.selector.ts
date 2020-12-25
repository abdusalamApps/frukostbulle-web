import * as fromFeature from '../reducers';
import * as fromUser from '../reducers/selected-seller.reducer';
import {createSelector} from '@ngrx/store';

export const getUserState = createSelector(
  fromFeature.getBuyerState,
  (state: fromFeature.BuyerState) => state.selectedSeller
);

export const getSelectedSeller = createSelector(
  getUserState,
  fromUser.getSeller,
);

export const getSellerLoaded = createSelector(
  getUserState,
  fromUser.getSellerLoaded,
);

export const getSellerLoading = createSelector(
  getUserState,
  fromUser.getSellerLoading,
);

import {createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromUser from '../reducers/user.reducer';

export const getUserState = createSelector(
  fromFeature.getSellerState,
  (state: fromFeature.SellerState) => state.user
);

export const getUserById = createSelector(
  getUserState,
  fromUser.getUser
);

export const getUserLoading = createSelector(
  getUserState,
  fromUser.getUserLoading
);

export const getUserLoaded = createSelector(
  getUserState,
  fromUser.getUserLoaded
);

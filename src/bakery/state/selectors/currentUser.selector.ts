import {createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromCurrentUser from '../reducers/currentUser.reducer';

export const getCurrentUserState = createSelector(
  fromFeature.getBakeryState,
  (state: fromFeature.BakeryState) => state.currentUser
);

export const getCurrentUserLoading = createSelector(
  getCurrentUserState,
  fromCurrentUser.getCurrentUserLoading
);


export const getCurrentUserLoaded = createSelector(
  getCurrentUserState,
  fromCurrentUser.getCurrentUserLoaded
);


export const getCurrentUser = createSelector(
  getCurrentUserState,
  fromCurrentUser.getCurrentUser
);
export const getCurrentUserId = createSelector(
  getCurrentUserState,
  fromCurrentUser.getCurrentUserId
);
export const getCurrentUserName = createSelector(
  getCurrentUserState,
  fromCurrentUser.getCurrentUserName
);
export const getCurrentUserCounty = createSelector(
  getCurrentUserState,
  fromCurrentUser.getCurrentUserCounty
);
export const getCurrentUserCity = createSelector(
  getCurrentUserState,
  fromCurrentUser.getCurrentUserCity
);
export const getCurrentUserAddress = createSelector(
  getCurrentUserState,
  fromCurrentUser.getCurrentUserAddress
);
export const getCurrentUserMobile = createSelector(
  getCurrentUserState,
  fromCurrentUser.getCurrentUserMobile
);

export const getCurrentUserEmail = createSelector(
  getCurrentUserState,
  fromCurrentUser.getCurrentUserEmail
);
export const getCurrentUserPermissionLevel = createSelector(
  getCurrentUserState,
  fromCurrentUser.getCurrentUserPermissionLevel
);
export const getCurrentUserReminder = createSelector(
  getCurrentUserState,
  fromCurrentUser.getCurrentUserReminder
);

export const getCurrentUserActive = createSelector(
  getCurrentUserState,
  fromCurrentUser.getCurrentUserActive
);


import {User} from '../../../models/user.model';
import * as userActions from '../actions/currentUser.action';

export interface CurrentUserState {
  currentUserLoading: boolean;
  currentUserLoaded: boolean;
  currentUser: User | null;
}

export const initialState: CurrentUserState = {
  currentUserLoading: false,
  currentUserLoaded: false,
  currentUser: null
};

export function reducer(
  state= initialState,
  action: userActions.CurrentUserAction
): CurrentUserState {
  switch (action.type) {
    case userActions.LOAD_CURRENT_USER: {
      return {
        ...state,
        currentUserLoaded: false,
        currentUserLoading: true
      };
    }
    case userActions.LOAD_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        currentUserLoaded: true,
        currentUserLoading: false,
        currentUser: action.payload
      }
    }
    case userActions.LOAD_CURRENT_USER_FAIL: {
      return {
        ...state,
        currentUserLoaded: false,
        currentUserLoading: false,
        currentUser: null,
      }
    }
    default:
      return state;
  }
}

export const getCurrentUser = (state: CurrentUserState) => state;
export const getCurrentUserId = (state: CurrentUserState) => state.currentUser?.id;
export const getCurrentUserName = (state: CurrentUserState) => state.currentUser?.name;
export const getCurrentUserCounty = (state: CurrentUserState) => state.currentUser?.county;
export const getCurrentUserCity = (state: CurrentUserState) => state.currentUser?.city;
export const getCurrentUserAddress = (state: CurrentUserState) => state.currentUser?.address;
export const getCurrentUserMobile = (state: CurrentUserState) => state.currentUser?.mobile;
export const getCurrentUserEmail = (state: CurrentUserState) => state.currentUser?.email;
export const getCurrentUserPassword = (state: CurrentUserState) => state.currentUser?.password;
export const getCurrentUserPermissionLevel = (state: CurrentUserState) => state.currentUser?.permissionLevel;
export const getCurrentUserReminder = (state: CurrentUserState) => state.currentUser?.reminder;
export const getCurrentUserAssociatedBakery = (state: CurrentUserState) => state.currentUser?.associatedBakery;
export const getCurrentUserActive = (state: CurrentUserState) => state.currentUser?.active;
export const getCurrentUserAvailableDates = (state: CurrentUserState) => state.currentUser?.availableDates;
export const getCurrentUserLastOrderDay = (state: CurrentUserState) => state.currentUser?.lasOrderDay;

import {User} from '../../../models/user.model';
import * as userActions from '../actions/buyerCurrentUserAction';

export interface CurrentUserState {
  currentUserLoading: boolean;
  currentUserLoaded: boolean;
  currentUser: User | null;
  currentUserSeller: User | null;
}

export const initialState: CurrentUserState = {
  currentUserLoading: false,
  currentUserLoaded: false,
  currentUser: null,
  currentUserSeller: null,
};

export function reducer(
  state = initialState,
  action: userActions.BuyerCurrentUserAction
): CurrentUserState {
  switch (action.type) {
    case userActions.SET_REMINDER:
    case userActions.BUYER_UPDATE_USER:
    case userActions.BUYER_LOAD_CURRENT_USER: {
      return {
        ...state,
        currentUserLoaded: false,
        currentUserLoading: true
      };
    }
    case userActions.SET_REMINDER_SUCCESS:
    case userActions.BUYER_UPDATE_USER_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload
      };
    }
    case userActions.BUYER_LOAD_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        currentUserLoaded: true,
        currentUserLoading: false,
        currentUser: action.payload
      };
    }

    case userActions.BUYER_LOAD_CURRENT_USER_FAIL: {
      return {
        ...state,
        currentUserLoaded: false,
        currentUserLoading: false,
        currentUser: null,
      };
    }
    case userActions.BUYER_UPDATE_SELLER_SUCCESS:
    case userActions.BUYER_LOAD_CURRENT_USER_SELLER_SUCCESS: {
      return {
        ...state,
        currentUserSeller: action.payload,
      };
    }

    default:
      return state;
  }
}

export const getCurrentUser = (state: CurrentUserState) => state.currentUser;
export const getCurrentUserLoaded = (state: CurrentUserState) => state.currentUserLoaded;
export const getCurrentUserLoading = (state: CurrentUserState) => state.currentUserLoading;
export const getCurrentUserId = (state: CurrentUserState) => state.currentUser?.id;
export const getCurrentUserName = (state: CurrentUserState) => state.currentUser?.name;
export const getCurrentUserCounty = (state: CurrentUserState) => state.currentUser?.county;
export const getCurrentUserCity = (state: CurrentUserState) => state.currentUser?.city;
export const getCurrentUserAddress = (state: CurrentUserState) => state.currentUser?.address;
export const getCurrentUserMobile = (state: CurrentUserState) => state.currentUser?.mobilenbr;
export const getCurrentUserEmail = (state: CurrentUserState) => state.currentUser?.email;
export const getCurrentUserPassword = (state: CurrentUserState) => state.currentUser?.password;
export const getCurrentUserPermissionLevel = (state: CurrentUserState) => state.currentUser?.permissionLevel;
export const getCurrentUserReminder = (state: CurrentUserState) => state.currentUser?.reminder;
export const getCurrentUserAssociatedSeller = (state: CurrentUserState) => state.currentUserSeller;
export const getAssociatedSellerId = (state: CurrentUserState) => state.currentUser?.associatedSeller;
export const getCurrentUserActive = (state: CurrentUserState) => state.currentUser?.active;
export const getCurrentUserLastOrderDay = (state: CurrentUserState) => state.currentUser?.lasOrderDay;

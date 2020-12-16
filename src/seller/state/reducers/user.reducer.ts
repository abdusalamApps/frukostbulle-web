import {User} from '../../../models/user.model';
import * as userActions from '../actions/user.action';
import {CurrentUserState} from './currentUser.reducer';

export interface UserState {
  userLoading: boolean;
  userLoaded: boolean;
  user: User | null;
}

export const initialState: UserState = {
  userLoading: false,
  userLoaded: false,
  user: null
};

export function reducer(
  state = initialState,
  action: userActions.UserAction
): UserState {
  switch (action.type) {
    case userActions.LOAD_USER_BUY_ID: {
      return {
        ...state,
        userLoading: true,
        userLoaded: false,
      };
    }
    case userActions.LOAD_USER_BUY_ID_SUCCESS: {
      return {
        userLoading: false,
        userLoaded: true,
        user: action.payload
      };
    }
    case userActions.LOAD_USER_BUY_ID_FAIL: {
      return {
        ...state,
        userLoading: false,
        userLoaded: false,
      };
    }
    default:
      return state;
  }
}

export const getUser = (state: UserState) => state.user;
export const getUserLoading = (state: UserState) => state.userLoading;
export const getUserLoaded = (state: UserState) => state.userLoaded;

import * as userActions from '../actions/selected-seller.action'
import {User} from '../../../models/user.model';
import {OrderState} from './order.reducer';

export interface SelectedSellerState {
  selectedSellerLoaded: boolean;
  selectedSellerLoading: boolean;
  selectedSeller: User | null;
}

export const initialState: SelectedSellerState = {
  selectedSellerLoaded: false,
  selectedSellerLoading: false,
  selectedSeller: null
};

export function reducer(
  state = initialState,
  action: userActions.SelectedSellerAction
): SelectedSellerState {
  switch (action.type) {
    case userActions.LOAD_SELECTED_SELLER: {
      return {
        ...state,
        selectedSellerLoading: true,
        selectedSellerLoaded: false
      }
    }
    case userActions.LOAD_SELECTED_SELLER_SUCCESS: {
      return {
        ...state,
        selectedSellerLoading: false,
        selectedSellerLoaded: true,
        selectedSeller: action.payload
      }
    }
    case userActions.LOAD_SELECTED_SELLER_FAIL: {
      return {
        ...state,
        selectedSellerLoading: false,
        selectedSellerLoaded: false,
      }
    }

    default:
      return state;
  }
}

export const getSeller = (state: SelectedSellerState) => state.selectedSeller;
export const getSellerLoading = (state: SelectedSellerState) => state.selectedSellerLoading;
export const getSellerLoaded = (state: SelectedSellerState) => state.selectedSellerLoaded;

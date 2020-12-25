import * as loadUserAction from '../actions/loadUsers.action';
import {User} from '../../../models/user.model';
import {Bakery} from '../../../models/bakery.model';

export interface LoadUsersState {
  buyers: { [buyerId: number]: User };
  bakeries: { [bakeryId: number]: Bakery };
  sellers: { [sellerId: number]: User };
  buyersLoaded: boolean;
  buyersLoading: boolean;
  sellersLoaded: boolean;
  sellersLoading: boolean;
  bakeriesLoaded: boolean;
  bakeriesLoading: boolean;
}

export const initialState: LoadUsersState = {
  buyers: {},
  bakeries: {},
  sellers: {},
  sellersLoaded: false,
  sellersLoading: false,
  buyersLoaded: false,
  buyersLoading: false,
  bakeriesLoaded: false,
  bakeriesLoading: false,
};

export function reducer(
  state = initialState,
  action: loadUserAction.UsersActions
): LoadUsersState {
  switch (action.type) {
    case loadUserAction.LOAD_BUYERS: {
      return {
        ...state,
        buyersLoaded: false,
        buyersLoading: true,
      };
    }
    case loadUserAction.LOAD_SELLERS: {
      return {
        ...state,
        sellersLoaded: false,
        sellersLoading: true,
      };
    }
    case loadUserAction.LOAD_BAKERIES: {
      return {
        ...state,
        bakeriesLoaded: false,
        bakeriesLoading: true,
      };
    }
    case loadUserAction.LOAD_BAKERIES_SUCCESS: {
      const entities = action.payload.reduce(
        (newEns: { [id: number]: Bakery }, bakery) => {
          return {
            ...newEns,
            [bakery.id]: bakery,
          };
        }, {}
      );
      return {
        ...state,
        bakeries: entities,
        bakeriesLoaded: true,
        bakeriesLoading: false,
      };
    }
    case loadUserAction.LOAD_BUYERS_SUCCESS: {
      const entities = action.payload.reduce(
        (newEns: { [id: number]: User }, user) => {
          return {
            ...newEns,
            [user.id]: user,
          };
        }, {}
      );
      return {
        ...state,
        buyers: entities,
        buyersLoaded: true,
        buyersLoading: false,
      };
    }
    case loadUserAction.LOAD_SELLER_SUCCESS: {
      const entities = action.payload.reduce(
        (newEns: { [id: number]: User }, user) => {
          return {
            ...newEns,
            [user.id]: user,
          };
        }, {}
      );
      return {
        ...state,
        sellers: entities,
        sellersLoaded: true,
        sellersLoading: false,
      };
    }
    case loadUserAction.LOAD_BAKERIES_FAIL: {
      return {
        ...state,
        bakeriesLoaded: false,
        bakeriesLoading: false,
      };
    }
    case loadUserAction.LOAD_SELLERS_FAIL: {
      return {
        ...state,
        sellersLoaded: false,
        sellersLoading: false,
      };
    }
    case loadUserAction.LOAD_BUYERS_FAIL: {
      return {
        ...state,
        buyersLoaded: false,
        buyersLoading: false,
      };
    }
    default:
      return state;
  }
}

export const getSellers = (state: LoadUsersState) => state.sellers;
export const getSellersLoaded = (state: LoadUsersState) => state.sellersLoaded;
export const getSellersLoading = (state: LoadUsersState) => state.sellersLoading;

export const getBuyers = (state: LoadUsersState) => state.buyers;
export const getBuyersLoaded = (state: LoadUsersState) => state.buyersLoaded;
export const getetBuyersLoading = (state: LoadUsersState) => state.buyersLoading;

export const getBakeries = (state: LoadUsersState) => state.bakeries;
export const getBakeriesLoaded = (state: LoadUsersState) => state.bakeriesLoaded;
export const getBakeriesLoading = (state: LoadUsersState) => state.bakeriesLoading;

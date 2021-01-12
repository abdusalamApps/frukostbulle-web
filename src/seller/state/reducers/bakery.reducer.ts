import * as bakeryActions from '../actions/bakery.action';
import {Bakery} from '../../../models/bakery.model';

export interface BakeryState {
  entities: { [bakeryId: number]: Bakery }
  bakeriesLoaded: boolean;
  bakeriesLoading: boolean;
  associatedBakery: Bakery | null;
}

export const initialState: BakeryState = {
  entities: {},
  bakeriesLoaded: false,
  bakeriesLoading: false,
  associatedBakery: null,
};

export function reducer(
  state = initialState,
  action: bakeryActions.BakeryAction
): BakeryState {
  switch (action.type) {
    case bakeryActions.LOAD_BAKERIES_BY_CITY:
    case bakeryActions.LOAD_BAKERIES_BY_COUNTY:
    case bakeryActions.LOAD_BAKERIES: {
      return {
        ...state,
        bakeriesLoaded: false,
        bakeriesLoading: true,
      };
    }
    case bakeryActions.LOAD_BAKERIES_SUCCESS: {
      const bakeries = action.payload;
      const entities = bakeries.reduce(
        (newEntities: { [bakeryId: number]: Bakery }, bakery) => {
          return {
            ...newEntities,
            [bakery.id]: bakery,
          };
        },
        {
          ...state.entities
        }
      );
      return {
        ...state,
        bakeriesLoaded: true,
        bakeriesLoading: false,
        entities
      };
    }
    case bakeryActions.LOAD_BAKERIES_FAIL: {
      return {
        ...state,
        bakeriesLoaded: false,
        bakeriesLoading: false,
      };
    }
    case bakeryActions.LOAD_BAKERY_BY_ID_SUCCESS: {
      return {
        ...state,
        associatedBakery: action.payload
      };
    }

    default:
      return state;
  }
}

export const getBakeryEntities = (state: BakeryState) => state.entities;
export const getBakeryLoading = (state: BakeryState) => state.bakeriesLoading;
export const getBakeryLoaded = (state: BakeryState) => state.bakeriesLoaded;
export const getAssociatedBakery = (state: BakeryState) => state.associatedBakery;

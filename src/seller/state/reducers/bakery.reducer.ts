import * as bakeryActions from '../actions/bakery.actions';
import {Bakery} from '../../../models/bakery.model';

export interface BakeryState {
  entities: { [bakeryId: number]: Bakery }
  bakeriesLoaded: boolean;
  bakeriesLoading: boolean;
}

export const initialState: BakeryState = {
  entities: {},
  bakeriesLoaded: false,
  bakeriesLoading: false,
};

export function reducer(
  state = initialState,
  action: bakeryActions.BakeryActions
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
        entities: entities
      };
    }
    case bakeryActions.LOAD_BAKERIES_FAIL: {
      return {
        ...state,
        bakeriesLoaded: false,
        bakeriesLoading: false,
      };
    }
    default:
      return state;
  }
}

export const getBakeryEntities = (state: BakeryState) => state.entities;
export const getBakeryLoading = (state: BakeryState) => state.bakeriesLoading;
export const getBakeryLoaded = (state: BakeryState) => state.bakeriesLoaded;

import {Item} from '../../../models/item.model';
import * as itemActions from '../actions/items.action';


export interface ItemState {
  entities: { [id: number]: Item };
  itemsLoaded: boolean;
  itemsLoading: boolean;
}

export const initialState: ItemState = {
  entities: {},
  itemsLoaded: false,
  itemsLoading: false,
};


export function reducer(
  state = initialState,
  action: itemActions.ItemsAction
): ItemState {
  switch (action.type) {
    case itemActions.LOAD_ITEMS: {
      return {
        ...state,
        itemsLoading: true,
        itemsLoaded: false,
      };
    }
    case itemActions.LOAD_ITEMS_FAIL: {
      return {
        ...state,
        itemsLoading: false,
        itemsLoaded: false,
      };
    }
    case itemActions.LOAD_ITEMS_SUCCESS: {
      const items = action.payload;

      const entities: { [p: number]: Item } = items.reduce(
        (newEntities: { [id: number]: Item }, item) => {
          return {
            ...newEntities,
            [item.itemId]: item,
          };
        }, {});
      return {
        // ...state,
        itemsLoading: false,
        itemsLoaded: true,
        entities,
      };
    }
    case itemActions.UPDATE_ITEM_SUCCESS:
    case itemActions.INSERT_ITEM_SUCCESS: {
      const item = action.payload;
      const entities = {
        ...state.entities,
        [item.itemId]: item,
      };
      return {
        ...state,
        entities
      };
    }
    case itemActions.DELETE_ITEM_SUCCESS: {
      const {[action.payload]: deleted, ...entities} = state.entities;
      return {
        ...state,
        entities
      };
    }
    default:
      return state;
  }
}

export const getItemsEntities = (state: ItemState) => state.entities;
export const getItemsLoading = (state: ItemState) => state.itemsLoading;
export const getItemsLoaded = (state: ItemState) => state.itemsLoaded;



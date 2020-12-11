import {Action} from '@ngrx/store';
import {Item} from '../../../models/item.model';

export const LOAD_ITEMS = '[Seller] Load Items';
export const LOAD_ITEMS_FAIL = '[Seller] Load Items Fail';
export const LOAD_ITEMS_SUCCESS = '[Seller] Load Items Success';


export class LoadItems implements Action {
  readonly type = LOAD_ITEMS;
  constructor(public payload: string | undefined) {
  }
}

export class LoadItemsFail implements Action {
  readonly type = LOAD_ITEMS_FAIL;
  constructor(public payload: any) {}
}

export class LoadItemsSuccess implements Action {
  readonly type = LOAD_ITEMS_SUCCESS;
  constructor(public payload: Item[]) {}
}

// actions types
export type ItemsAction = LoadItems | LoadItemsFail | LoadItemsSuccess;

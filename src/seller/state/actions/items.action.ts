import {Action} from '@ngrx/store';
import {Item} from '../../../models/item.model';
import {InsertItem as InsertItemModel} from '../../../models/insertItem.model';

export const LOAD_ITEMS = '[Seller] Load Items';
export const LOAD_ITEMS_FAIL = '[Seller] Load Items Fail';
export const LOAD_ITEMS_SUCCESS = '[Seller] Load Items Success';

export const INSERT_ITEM = '[Seller] Insert Item';
export const INSERT_ITEM_SUCCESS = '[Seller] Insert Item Success';
export const INSERT_ITEM_FAIL = '[Seller] Insert Item Fail';

export const REMOVE_ITEM = '[Seller] Remove Item';
export const REMOVE_ITEM_SUCCESS = '[Seller] Remove Item Success';
export const REMOVE_ITEM_FAIL = '[Seller] Remove Item Fail';


export class LoadItems implements Action {
  readonly type = LOAD_ITEMS;

  constructor(public payload: string | undefined) {
  }
}

export class LoadItemsFail implements Action {
  readonly type = LOAD_ITEMS_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadItemsSuccess implements Action {
  readonly type = LOAD_ITEMS_SUCCESS;

  constructor(public payload: Item[]) {
  }
}

export class InsertItem implements Action {
  readonly type = INSERT_ITEM;

  constructor(public payload: Item) {
  }
}

export class InsertItemSuccess implements Action {
  readonly type = INSERT_ITEM_SUCCESS;
}

export class InsertItemFail implements Action {
  readonly type = INSERT_ITEM_FAIL;

  constructor(public payload: any) {
  }
}

export class RemoveItem implements Action {
  readonly type = REMOVE_ITEM;

  constructor(public payload: Item) {
  }
}

export class RemoveItemSuccess implements Action {
  readonly type = REMOVE_ITEM_SUCCESS;
}

export class RemoveItemFail implements Action {
  readonly type = REMOVE_ITEM_FAIL;

  constructor(public payload: any) {
  }
}


// actions types
export type ItemsAction =
  | LoadItems
  | LoadItemsFail
  | LoadItemsSuccess
  | InsertItem
  | InsertItemSuccess
  | InsertItemFail
  | RemoveItem
  | RemoveItemSuccess
  | RemoveItemFail;

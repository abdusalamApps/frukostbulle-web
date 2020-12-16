import {Action} from '@ngrx/store';
import {Item} from '../../../models/item.model';
import {InsertItem as InsertItemModel} from '../../../models/insertItem.model';

export const LOAD_ITEMS = '[Seller] Load Items';
export const LOAD_ITEMS_FAIL = '[Seller] Load Items Fail';
export const LOAD_ITEMS_SUCCESS = '[Seller] Load Items Success';

export const INSERT_ITEM = '[Seller] Insert Item';
export const INSERT_ITEM_CONFIRM = '[Seller] Insert Item Confirm';
export const INSERT_ITEM_CANCEL = '[Seller] Insert Item Cancel';
export const INSERT_ITEM_SUCCESS = '[Seller] Insert Item Success';
export const INSERT_ITEM_FAIL = '[Seller] Insert Item Fail';

export const UPDATE_ITEM = '[Seller] Update Item';
export const UPDATE_ITEM_SUCCESS = '[Seller] Update Item Success';
export const UPDATE_ITEM_FAIL = '[Seller] Update Item Fail';

export const DELETE_ITEM = '[Seller] Delete Item';
export const DELETE_ITEM_SUCCESS = '[Seller] Delete Item Success';
export const DELETE_ITEM_FAIL = '[Seller] Delete Item Fail';


export class LoadItems implements Action {
  readonly type = LOAD_ITEMS;

  constructor(public payload: number | undefined) {
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

export class InsertItemConfirm implements Action {
  readonly type = INSERT_ITEM_CONFIRM;

  constructor(public payload: Item) {
  }
}

export class InsertItemCancel implements Action {
  readonly type = INSERT_ITEM_CANCEL;

}



export class InsertItemSuccess implements Action {
  readonly type = INSERT_ITEM_SUCCESS;
  constructor(public payload: Item) {
  }
}

export class InsertItemFail implements Action {
  readonly type = INSERT_ITEM_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateItem implements Action {
  readonly type = UPDATE_ITEM;

  constructor(public payload: Item) {
  }
}

export class UpdateItemSuccess implements Action {
  readonly type = UPDATE_ITEM_SUCCESS;
  constructor(public payload: Item) {
  }
}

export class UpdateItemFail implements Action {
  readonly type = UPDATE_ITEM_FAIL;

  constructor(public payload: any) {
  }
}


export class DeleteItem implements Action {
  readonly type = DELETE_ITEM;

  constructor(public payload: number) {
  }
}

export class DeleteItemSuccess implements Action {
  readonly type = DELETE_ITEM_SUCCESS;
  constructor(public payload: number) {
  }
}

export class DeleteItemFail implements Action {
  readonly type = DELETE_ITEM_FAIL;

  constructor(public payload: any) {
  }
}

// actions types
export type ItemsAction =
  | LoadItems | LoadItemsFail | LoadItemsSuccess
  | InsertItem | InsertItemSuccess | InsertItemFail
  | UpdateItem | UpdateItemSuccess | UpdateItemFail
  | DeleteItem | DeleteItemSuccess | DeleteItemFail;

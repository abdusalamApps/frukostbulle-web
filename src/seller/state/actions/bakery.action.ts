/**
 * this file contains actions that has to do withe managing
 * the seller's associated bakery and loading bakeries
 */

import {Action} from '@ngrx/store';
import {Bakery} from '../../../models/bakery.model';

export const LOAD_BAKERIES = '[Bakery] Load Bakeries';
export const LOAD_BAKERIES_BY_CITY = '[Bakery] Load Bakeries By City';
export const LOAD_BAKERIES_BY_COUNTY = '[Bakery] Load Bakeries By County';
export const LOAD_BAKERIES_SUCCESS = '[Bakery] Load Bakeries Success';
export const LOAD_BAKERIES_FAIL = '[Bakery] Load Bakeries Fail';

export const LOAD_BAKERY_BY_ID = '[Bakery] Load Bakery By Id';
export const LOAD_BAKERY_BY_ID_SUCCESS = '[Bakery] Load Bakery By Id Success';
export const LOAD_BAKERY_BY_ID_FAIL = '[Bakery] Load Bakery By Id Fail';

export const ASSOCIATE_BAKERY = '[Bakery] Associate Bakery';
export const ASSOCIATE_BAKERY_CONFIRM = '[Bakery] Associate Bakery Confirm';
export const ASSOCIATE_BAKERY_CANCEL = '[Bakery] Associate Bakery Cancel';

export const ASSOCIATE_BAKERY_SUCCESS = '[Bakery] Associate Bakery Success';
export const ASSOCIATE_BAKERY_FAIL = '[Bakery] Associate Bakery Fail';


export class LoadBakeries implements Action {
  readonly type = LOAD_BAKERIES;
}

export class LoadBakeriesByCity implements Action {
  readonly type = LOAD_BAKERIES_BY_CITY;

  constructor(public payload: string) {
  }
}

export class LoadBakeriesByCounty implements Action {
  readonly type = LOAD_BAKERIES_BY_COUNTY;

  constructor(public payload: string) {
  }
}

export class LoadBakeriesSuccess implements Action {
  readonly type = LOAD_BAKERIES_SUCCESS;

  constructor(public payload: Bakery[]) {
  }
}

export class LoadBakeriesFail implements Action {
  readonly type = LOAD_BAKERIES_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadBakeryById implements Action {
  readonly type = LOAD_BAKERY_BY_ID;

  constructor(public payload: number) {
  }
}

export class LoadBakeryByIdSuccess implements Action {
  readonly type = LOAD_BAKERY_BY_ID_SUCCESS;

  constructor(public payload: Bakery) {
  }
}

export class LoadBakeryByIdFail implements Action {
  readonly type = LOAD_BAKERY_BY_ID_FAIL;

  constructor(public payload: any) {
  }
}

export class AssociateBakery implements Action {
  readonly type = ASSOCIATE_BAKERY;

  constructor(public payload: { bakeryId: number, sellerId: number }) {
  }
}

export class AssociateBakeryConfirm implements Action {
  readonly type = ASSOCIATE_BAKERY_CONFIRM;

  constructor(public userId: number, public bakeryId: number) {
  }
}


export class AssociateBakerySuccess implements Action {
  readonly type = ASSOCIATE_BAKERY_SUCCESS;
}

export class AssociateBakeryFail implements Action {
  readonly type = ASSOCIATE_BAKERY_FAIL;

  constructor(public payload: any) {
  }
}


export type BakeryAction =
  | LoadBakeries | LoadBakeriesByCity | LoadBakeriesByCounty
  | LoadBakeriesSuccess | LoadBakeriesFail
  | AssociateBakery | AssociateBakerySuccess | AssociateBakeryFail
  | AssociateBakeryConfirm
  | LoadBakeryById | LoadBakeryByIdSuccess | LoadBakeryByIdFail;

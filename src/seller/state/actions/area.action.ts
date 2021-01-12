/**
 * This file contains actions that has to do with sellers' areas.
 * The pattern which by these actions are defined is repeated across
 * all .action.ts files
 */

import {Action} from '@ngrx/store';
import {Area} from '../../../models/area.model';

// loads all the relevant selling areas
export const LOAD_AREAS = '[Area] Load Area';

// gets dispatched when areas are loaded successfully
export const LOAD_AREAS_SUCCESS = '[Area] Load Area Success';

// get dispatched when there is an error loading the areas
export const LOAD_AREAS_FAIL = '[Area] Load Area Fail';

// loads a specific area that belongs to a seller
export const LOAD_USER_AREA = '[Area] Load User Area';

// gets dispatched when the seller's area is dispatched successfully
export const LOAD_USER_SUCCESS = '[Area] Load User Area Success';

// gets dispatched when there is error loading the seller's area
export const LOAD_USER_FAIL = '[Area] Load User Area Fail';

// updates the specific seller's area
export const UPDATE_AREA = '[Area] Update Area';

// gets dispatched when updating the area is successful
export const UPDATE_AREA_SUCCESS = '[Area] Update Area Success';

// gets dispatched when there is an error updating the area
export const UPDATE_AREA_FAIL = '[Area] Update Area Fail';

export class UpdateArea implements Action {
  readonly type = UPDATE_AREA;
  constructor(public payload: Area) {
  }
}
export class UpdateAreaSuccess implements Action {
  readonly type = UPDATE_AREA_SUCCESS;
  constructor(public payload: Area) {
  }
}
export class UpdateAreaFail implements Action {
  readonly type = UPDATE_AREA_FAIL;
  constructor(public payload: any) {
  }
}


export type AreaAction =
  | UpdateArea | UpdateAreaSuccess | UpdateAreaFail;

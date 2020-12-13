import {Action} from '@ngrx/store';
import {Area} from '../../../models/area.model';

export const LOAD_AREAS = '[Area] Load Area';
export const LOAD_AREAS_SUCCESS = '[Area] Load Area Success';
export const LOAD_AREAS_FAIL = '[Area] Load Area Fail';

export const LOAD_USER_AREA = '[Area] Load User Area';
export const LOAD_USER_SUCCESS = '[Area] Load User Area Success';
export const LOAD_USER_FAIL = '[Area] Load User Area Fail';

export const UPDATE_AREA = '[Area] Update Area';
export const UPDATE_AREA_SUCCESS = '[Area] Update Area Success';
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


export type AreaActions =
  | UpdateArea | UpdateAreaSuccess | UpdateAreaFail;

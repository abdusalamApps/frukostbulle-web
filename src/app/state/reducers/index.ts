import * as fromRouter from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export { CustomSerializer } from './router.reducer';

export interface RootState {
  router: fromRouter.RouterReducerState<any>;
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<RootState, any> = {
  router: routerReducer,
  auth: fromAuth.reducer,
};

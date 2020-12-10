import * as fromRouter from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromRouterReducer from './router.reducer';

export { CustomSerializer } from './router.reducer';

export interface RootState {
  router: fromRouter.RouterReducerState<any>;
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<RootState, any> = {
  router: routerReducer,
  auth: fromAuth.reducer,
};

export const getStoreRootState = createFeatureSelector<RootState>('root');

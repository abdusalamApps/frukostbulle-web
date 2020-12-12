import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {State} from '../reducers';
import * as HydrationActions from '../actions/hydration.actions';
import {distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

@Injectable()
export class HydrationEffects implements OnInitEffects {

  constructor(private action$: Actions, private  store: Store<State>) {
  }

  hydrate$ = createEffect(() =>
    this.action$.pipe(
      ofType(HydrationActions.hydrate),
      map(() => {
        const storageValue = localStorage.getItem('state');
        if (storageValue) {
          try {
            const state = JSON.parse(storageValue);
            return HydrationActions.hydrateSuccess({state});
          } catch {
            localStorage.removeItem('state');
          }
        }
        return HydrationActions.hydrateFailure();
      })
    )
  );

  serialize$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(HydrationActions.hydrateSuccess, HydrationActions.hydrateFailure),
        switchMap(() => this.store),
        distinctUntilChanged(),
        tap((state) => localStorage.setItem('state', JSON.stringify(state)))
      ),
    {dispatch: false}
  );

  ngrxOnInitEffects(): Action {
    return HydrationActions.hydrate();
  }


}
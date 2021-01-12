import * as fromRoot from '../../../app/state';
import * as areaActions from '../actions/area.action';
import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {AreaService} from '../../services/area.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as itemActions from '../actions/items.action';

@Injectable()
export class AreaEffects {
  constructor(private actions$: Actions,
              private areaService: AreaService) {
  }

  updateArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(areaActions.UPDATE_AREA),
      switchMap((action: areaActions.UpdateArea) => {
        return this.areaService.updateArea(action.payload).pipe(
          map(() => new areaActions.UpdateAreaSuccess(action.payload)),
          catchError((error) => of(new areaActions.UpdateAreaFail(error)))
        );
      })
    )
  );

  updateAreaSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(areaActions.UPDATE_AREA_SUCCESS),
      switchMap((action: itemActions.UpdateItemSuccess) => {
        return of(new fromRoot.Back());
      })
    )
  );

}

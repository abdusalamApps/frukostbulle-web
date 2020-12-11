import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {ItemsService} from '../../services/items.service';
import * as itemActions from '../actions/items.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class ItemsEffects {
  constructor(private actions$: Actions, private itemsService: ItemsService) {
  }

  @Effect()
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(itemActions.LOAD_ITEMS),
      switchMap(() => {
        return this.itemsService.getItems().pipe(
          map((items) => new itemActions.LoadItemsSuccess(items)),
          catchError((error) => of(new itemActions.LoadItemsFail(error)))
        );
      })
    )
  );
}

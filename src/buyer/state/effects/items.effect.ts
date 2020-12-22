import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {ItemsService} from '../../../seller/services/items.service';
import * as itemActions from '../actions/items.action';
import {catchError, exhaustMap, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as fromRoot from '../../../app/state';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {ItemState} from '../reducers/items.reducer';

@Injectable()
export class ItemsEffects {
  constructor(private actions$: Actions,
              private itemsService: ItemsService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private store: Store<ItemState>) {
  }

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(itemActions.LOAD_ITEMS),
      switchMap((action: itemActions.LoadItems) => {
        return this.itemsService.getSellerItemsById(action.payload).pipe(
          map((items) => new itemActions.LoadItemsSuccess(items)),
          catchError((error) => of(new itemActions.LoadItemsFail(error)))
        );
      })
    )
  );
}

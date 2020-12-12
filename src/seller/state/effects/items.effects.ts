import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {ItemsService} from '../../services/items.service';
import * as itemActions from '../actions/items.action';
import {catchError, exhaustMap, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as fromRoot from '../../../app/state';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class ItemsEffects {
  constructor(private actions$: Actions,
              private itemsService: ItemsService,
              private snackBar: MatSnackBar) {
  }

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(itemActions.LOAD_ITEMS),
      switchMap((action: itemActions.LoadItems) => {
        return this.itemsService.getSellerItems(action.payload).pipe(
          map((items) => new itemActions.LoadItemsSuccess(items)),
          catchError((error) => of(new itemActions.LoadItemsFail(error)))
        );
      })
    )
  );

  insertItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(itemActions.INSERT_ITEM),
      exhaustMap((action: itemActions.InsertItem) => {
        return this.itemsService.insertItem(action.payload).pipe(
          map(() => new itemActions.InsertItemSuccess(action.payload)),
          catchError(error => of(new itemActions.InsertItemFail(error)))
        );
      })
    )
  );

  insertItemSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(itemActions.INSERT_ITEM_SUCCESS),
      switchMap((action: itemActions.InsertItemSuccess) => {
        this.snackBar.open('Sparat!', 'Ok', {duration: 1000});
        return of(new fromRoot.Back());
      })
    )
  );

  insertItemFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(itemActions.INSERT_ITEM_FAIL),
        switchMap((action: itemActions.InsertItemFail) => {
          return of(this.snackBar.open('Fel! Försök igen senare', 'Ok', {duration: 2000}));
        }),
      ),
    {dispatch: false}
  );

  deleteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(itemActions.DELETE_ITEM),
      exhaustMap((action: itemActions.DeleteItem) => {
        return this.itemsService.deleteItem(action.payload).pipe(
          map(() => new itemActions.DeleteItemSuccess(action.payload)),
          catchError(error => of(new itemActions.DeleteItemFail(error)))
        );
      })
    )
  );

  deleteItemSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(itemActions.DELETE_ITEM_SUCCESS),
      exhaustMap((action: itemActions.DeleteItemSuccess) => {
        return of(new fromRoot.Back());
      })
    )
  );




}

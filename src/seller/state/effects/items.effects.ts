import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {ItemsService} from '../../services/items.service';
import * as itemActions from '../actions/items.action';
import {catchError, exhaustMap, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as fromRoot from '../../../app/state';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {InsertItemDialogComponent} from '../../components/insert-item-dialog/insert-item-dialog.component';
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

  insertItem$ = createEffect(() =>
      this.actions$.pipe(
        ofType(itemActions.INSERT_ITEM),
        map((action: itemActions.InsertItem) => {
          this.dialog.open(InsertItemDialogComponent, {
            data: {
              store: this.store,
              item: action.payload
            }
          });
        })
      ),
    {dispatch: false}
  );

  insertItemConfirm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(itemActions.INSERT_ITEM_CONFIRM),
      exhaustMap((action: itemActions.InsertItemConfirm) => {
        return this.itemsService.insertItem(action.payload).pipe(
          map(() => new itemActions.InsertItemSuccess(action.payload)),
          catchError(error => of(new itemActions.InsertItemFail(error)))
        );
      })
    ),
  );

  insertItemSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(itemActions.INSERT_ITEM_SUCCESS, itemActions.UPDATE_ITEM_SUCCESS),
      switchMap((action: itemActions.InsertItemSuccess | itemActions.UpdateItemSuccess) => {
        this.snackBar.open('Sparat!', 'Ok', {duration: 1000});
        return of(new fromRoot.Back());
      })
    )
  );

  insertItemFail$ = createEffect(() =>
      this.actions$.pipe(
        ofType(itemActions.INSERT_ITEM_FAIL, itemActions.UPDATE_ITEM_FAIL),
        switchMap((action: itemActions.InsertItemFail | itemActions.UpdateItemFail) => {
          return of(this.snackBar.open('Fel! Försök igen senare', 'Ok', {duration: 2000}));
        }),
      ),
    {dispatch: false}
  );

  updateItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(itemActions.UPDATE_ITEM),
      exhaustMap((action: itemActions.UpdateItem) => {
        return this.itemsService.updateItem(action.payload).pipe(
          map(() => new itemActions.UpdateItemSuccess(action.payload)),
          catchError(error => of(new itemActions.UpdateItemFail(error)))
        );
      })
    )
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
        this.snackBar.open('Borttagen!', 'Ok', {duration: 1000});
        return of(new fromRoot.Back());
      })
    )
  );

  deleteItemFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(itemActions.DELETE_ITEM_FAIL),
      switchMap((action: itemActions.DeleteItemFail) => {
        this.snackBar.open('Fel! Försök igen senare!', 'Ok', {duration: 1000});
        return of(new fromRoot.Back());
      })
    )
  );


}

import * as bakeryActions from '../actions/bakery.action';
import * as fromRoot from 'src/app/state';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BakeryService} from '../../services/bakery.service';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ChooseBakeryDialogComponent} from '../../components/choose-bakery-dialog/choose-bakery-dialog.component';
import {Store} from '@ngrx/store';
import {BakeryState} from '../reducers/bakery.reducer';

@Injectable()
export class BakeryEffects {
  constructor(private actions$: Actions,
              private bakeryService: BakeryService,
              private dialog: MatDialog,
              private store: Store<BakeryState>) {
  }

  loadBakeries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bakeryActions.LOAD_BAKERIES),
      switchMap(() => {
        return this.bakeryService.getBakeries().pipe(
          map((bakeries) => new bakeryActions.LoadBakeriesSuccess(bakeries)),
          catchError(error => of(new bakeryActions.LoadBakeriesFail(error)))
        );
      })
    ));

  loadBakeriesByCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bakeryActions.LOAD_BAKERIES_BY_CITY),
      switchMap((action: bakeryActions.LoadBakeriesByCity) => {
        return this.bakeryService.getBakeriesByCity(action.payload).pipe(
          map((bakeries) => new bakeryActions.LoadBakeriesSuccess(bakeries)),
          catchError(error => of(new bakeryActions.LoadBakeriesFail(error)))
        );
      })
    )
  );

  loadBakeriesByCounty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bakeryActions.LOAD_BAKERIES_BY_COUNTY),
      switchMap((action: bakeryActions.LoadBakeriesByCounty) => {
        return this.bakeryService.getBakeriesByCity(action.payload).pipe(
          map((bakeries) => new bakeryActions.LoadBakeriesSuccess(bakeries)),
          catchError(error => of(new bakeryActions.LoadBakeriesFail(error)))
        );
      })
    )
  );

  associateBakery$ = createEffect(() =>
      this.actions$.pipe(
        ofType(bakeryActions.ASSOCIATE_BAKERY),
        map((action: bakeryActions.AssociateBakery) => {
          // Show Dialog to confirm
          this.dialog.open(ChooseBakeryDialogComponent, {
            data: {
              bakeryId: action.payload.bakeryId,
              sellerId: action.payload.sellerId,
              store: this.store,
            }
          });
        })
      ),
    {dispatch: false}
  );

  associateBakeryConfirm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bakeryActions.ASSOCIATE_BAKERY_CONFIRM),
      switchMap((action: bakeryActions.AssociateBakeryConfirm) => {
        return this.bakeryService.associateBakery(action.userId, action.bakeryId).pipe(
          map(() => new bakeryActions.AssociateBakerySuccess()),
          catchError((error: any) => of(new bakeryActions.AssociateBakeryFail(error)))
        );
      })
    )
  );

  associateBakerySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bakeryActions.ASSOCIATE_BAKERY_SUCCESS),
      mergeMap(() => {
        return of(new fromRoot.Back());
      })
    )
  );

  loadBakeryById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bakeryActions.LOAD_BAKERY_BY_ID),
      switchMap((action: bakeryActions.LoadBakeryById) => {
        return this.bakeryService.getBakeryById(action.payload).pipe(
          map((bakery) => new bakeryActions.LoadBakeryByIdSuccess(bakery)),
          catchError((error) => of(new bakeryActions.LoadBakeryByIdFail(error)))
        );
      })
    )
  );

}

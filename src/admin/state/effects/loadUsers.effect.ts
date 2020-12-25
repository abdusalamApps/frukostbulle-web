import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LoadUsersService} from '../../services/load-users.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as loadUsersActions from '../actions/loadUsers.action';

@Injectable()
export class LoadUsersEffect{
  constructor(private actions$: Actions,
              private loadUsersService: LoadUsersService) {
  }

  loadBakeries$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadUsersActions.LOAD_BAKERIES),
    switchMap((action: loadUsersActions.LoadBakeries) => {
      return this.loadUsersService.getAllBakeries().pipe(
        map((bakeries) => new loadUsersActions.LoadBakeriesSuccess(bakeries)),
        catchError((error) => of(new loadUsersActions.LoadBakeriesFail(error)))
      );
    })
  )
  );

  loadSellers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsersActions.LOAD_SELLERS),
      switchMap((action: loadUsersActions.LoadSellers) => {
        return this.loadUsersService.getAllSellers().pipe(
          map((sellers) => new loadUsersActions.LoadSellersSuccess(sellers)),
          catchError((error) => of(new loadUsersActions.LoadSellersFail(error)))
        );
      })
    )
  );

  loadBuyers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsersActions.LOAD_BUYERS),
      switchMap((action: loadUsersActions.LoadBuyers) => {
        return this.loadUsersService.getAllBuyers().pipe(
          map((buyers) => new loadUsersActions.LoadBuyersSuccess(buyers)),
          catchError((error) => of(new loadUsersActions.LoadBuyersFail(error)))
        );
      })
    )
  );

}

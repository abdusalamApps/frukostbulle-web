import * as orderActions from '../actions/order.action';
import * as rootActions from 'src/app/state/actions';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {OrdersService} from '../../../seller/services/orders.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {create} from "domain";

@Injectable()
export class OrderEffect {
  constructor(private actions$: Actions,
              private orderService: OrdersService) {
  }

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.LOAD_BUYER_ORDERS),
      switchMap((action: orderActions.LoadBuyerOrders) => {
        return this.orderService.getOrdersBySellerId(action.payload).pipe(
          map((orders) => new orderActions.LoadBuyerOrdersSuccess(orders)),
          catchError((error) => of(new orderActions.LoadBuyerOrdersFail(error)))
        );
      })
    )
  );

  loadOrderHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.LOAD_BUYER_ORDER_HISTORY),
      switchMap((action: orderActions.LoadBuyerOrderHistory) => {
        return this.orderService.getOrderHistoryBySellerId(action.payload).pipe(
          map((orders) => new orderActions.LoadBuyerOrderHistorySuccess(orders)),
          catchError((error) => of(new orderActions.LoadBuyerOrderHistoryFail(error)))
        );
      })
    )
  );

  insertOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.INSERT_ORDER),
      switchMap((action: orderActions.InsertOrder) => {
        return this.orderService.insertOrder(action.payload).pipe(
          map(() => new orderActions.InsertOrderSuccess(action.payload)),
          catchError((error: any) => of(new orderActions.InsertOrderFail(error)))
        )
      })
    )
  )

  insertOrderSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.INSERT_ORDER_SUCCESS),
      switchMap((action: orderActions.InsertOrderSuccess) => {
        return of(new rootActions.Go({path: ['buyer/confirmation-login']}))
      })
    )
  )
}

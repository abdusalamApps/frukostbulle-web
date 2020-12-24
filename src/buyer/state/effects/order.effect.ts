import * as orderActions from '../actions/order.action';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {OrdersService} from '../../../seller/services/orders.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

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

}

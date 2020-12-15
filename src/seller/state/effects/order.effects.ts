import * as orderActions from '../actions/order.actions';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {OrdersService} from '../../services/orders.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions,
              private orderService: OrdersService) {
  }

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.LOAD_SELLER_ORDERS),
      switchMap((action: orderActions.LoadSellerOrders) => {
        return this.orderService.getOrdersBySellerId(action.payload).pipe(
          map((orders) => new orderActions.LoadSellerOrdersSuccess(orders)),
          catchError((error) => of(new orderActions.LoadSellerOrdersFail(error)))
        );
      })
    )
  );



}

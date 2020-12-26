import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../../app/state';
import {Observable} from 'rxjs';
import {Order} from '../../../models/order.model';
import {Store} from '@ngrx/store';
import * as fromState from '../../../bakery/state';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],

})
export class OrderHistoryComponent implements OnInit {

  title = 'historik';

  orders$ = new Observable<Order[]>();

  constructor(private store: Store<fromState.BakeryState>) {}

  ngOnInit(): void {

    this.orders$ = this.store.select(fromState.getOrderHistory);
  }
  public navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }

  getOrderTotal(orderId: number): number {
    let theTotal = 0;
    this.store.select(fromState.getOrderTotal, {orderId}).pipe(
      map((total) => {
        theTotal = total;
      }),
      take(1)
    );
    return theTotal;
  }
}

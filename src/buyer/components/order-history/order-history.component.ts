import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../../../models/order.model';
import * as fromState from '../../state';
import {map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromRoot from 'src/app/state';
import {OrderHistory} from '../../../models/order-history.model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  title = 'Historik';

  orders$ = new Observable<OrderHistory[]>();

  constructor(private store: Store<fromState.BuyerState>,
  ) {
  }

  ngOnInit(): void {
    this.orders$ = this.store.select(fromState.getBuyerOrderHistory);
  }

  getOrderTotal(orderId: number): number {
    let theTotal = 0;
    this.store.select(fromState.getBuyerOrderTotal, {orderId}).pipe(
      map((total) => {
        theTotal = total;
      }),
      take(1)
    );
    return theTotal;
    return 0;
  }

  public navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }

}

import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Order} from '../../../models/order.model';
import * as fromState from '../../state';

@Component({
  selector: 'app-week-orders',
  templateUrl: './week-orders.component.html',
  styleUrls: ['./week-orders.component.scss']
})
export class WeekOrdersComponent implements OnInit {

  title = 'Beställningar';

  orders$ = new Observable<Order[]>();

  constructor(private store: Store<fromState.SellerState>) {
  }

  ngOnInit(): void {
    this.orders$ = this.store.select(fromState.getSellerOrders);
    this.store.select(fromState.getSellerOrders);
  }

  getOrderTotal(orderId: number): Observable<number> {
    return this.store.select(fromState.getOrderTotal, {orderId});
  }


}

import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../../../models/order.model';
import {Store} from '@ngrx/store';
import * as fromState from '../../../bakery/state';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],

})
export class OrdersComponent implements OnInit {
  title = 'Beställningar';
  orders$ = new Observable<Order[]>();

  constructor(private store: Store<fromState.BakeryState>) {}


  ngOnInit(): void {
    this.orders$ = this.store.select(fromState.getBakeryOrders);
    this.store.select(fromState.getBakeryOrders);
  }

  getOrderTotal(orderId: number): Observable<number> {
    return this.store.select(fromState.getOrderTotal, {orderId});
  }
}

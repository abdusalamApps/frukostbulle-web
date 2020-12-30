import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../../../models/order.model';
import {Store} from '@ngrx/store';
import * as fromState from '../../../bakery/state';
import {LoginInfo} from '../../../models/loginInfo.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],

})
export class OrdersComponent implements OnInit {
  title = 'Beställningar';

  orders$ = new Observable<Order[]>();

  constructor(private store: Store<fromState.BakeryState>) {
  }


  ngOnInit(): void {
    const userId = localStorage.getItem('currentUserId');
    console.log(userId);
    if (userId) {
      console.log('hej hej abdo el jini');
      this.store.dispatch(new fromState.LoadBakeryOrders(
        parseInt(userId, 10)
      ));
    }
    this.orders$ = this.store.select(fromState.getBakeryOrders);
  }

  getOrderTotal(orderId: number): Observable<number> {
    return this.store.select(fromState.getOrderTotal, {orderId});
  }

}

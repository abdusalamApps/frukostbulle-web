import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Order} from '../../../models/order.model';
import * as fromState from '../../state';
import {OrdersService} from '../../services/orders.service';

// displays the orders that are relevant for the current week
@Component({
  selector: 'app-week-orders',
  templateUrl: './week-orders.component.html',
  styleUrls: ['./week-orders.component.scss']
})
export class WeekOrdersComponent implements OnInit {

  title = 'Beställningar';

  orders$ = new Observable<Order[]>();

  constructor(private store: Store<fromState.SellerState>,
              private orderService: OrdersService) {
  }

  ngOnInit(): void {
    this.orders$ = this.store.select(fromState.getSellerOrders);
    this.store.select(fromState.getSellerOrders);
  }

  getOrderTotal(orderId: number): Observable<number> {
    return this.store.select(fromState.getOrderTotal, {orderId});
  }

  getPdf(sellerId: number, bakeryId: number, begin: string, end: string) {
    this.orderService.getSellerPdf(sellerId, bakeryId, begin, end).subscribe(
      (data: Blob) => {
        console.log(`seller pdf data: ${data}`)
      },
      (error: any) => {
        console.log(`seller pdf error: ${JSON.stringify(error)}`)
      }
    );

  }

}

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Order} from 'src/models/order.model';
import {Item} from '../../../../models/item.model';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../../../models/user.model';
import {State, Store} from '@ngrx/store';
import * as fromState from '../../../state';
import {OrdersService} from '../../../services/orders.service';
import {MarkOrderDialog, MarkType} from '../../mark-order/mark-order-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-order-details-card',
  templateUrl: './order-details-card.component.html',
  styleUrls: ['./order-details-card.component.scss']
})
export class OrderDetailsCardComponent implements OnInit, OnDestroy {
  @Input() order: Order = {
    id: -1,
    sellerId: -1,
    buyerId: -1,
    bakeryId: -1,
    sellerName: '',
    buyerName: '',
    bakeryName: '',
    deliveryMethod: false,
    deliveryTime: 1,
    deliveryDate: '',
    handled: false,
    paid: false,
    delivered: false,
    fake: false,
    content: []
  };

  buyer$ = new Observable<User | null>();

  sub$ = new Subscription();

  constructor(private store: Store<fromState.SellerState>,
              private orderService: OrdersService,
              private dialog: MatDialog) {

  }

  ngOnInit(): void {
    if (this.order) {
      this.store.dispatch(new fromState.LoadUserById(this.order.buyerId));
      this.buyer$ = this.store.select(fromState.getUserById);
    }
  }

  getOrderTotal(orderId: number): Observable<number> {
    return this.store.select(fromState.getOrderTotal, {orderId});
  }

  onMarkClick(markType: MarkType) {
    switch (markType) {
      case MarkType.PAID:
        this.dialog.open(MarkOrderDialog, {
          data: {
            function: this.onMarkPaid,
            title: 'Markera betald?',
            object: this.order,
            service: this.orderService
          }
        });
        break;
      case MarkType.DELIVERED:
        this.dialog.open(MarkOrderDialog, {
          data: {
            function: this.onMarkDelivered,
            title: 'Markera levererad?',
            object: this.order,
            service: this.orderService
          }
        });
        break;
      case MarkType.FAKE:
        this.dialog.open(MarkOrderDialog, {
          data: {
            function: this.onMarkFake,
            title: 'Markera fejk?',
            object: this.order,
            service: this.orderService
          }
        });
        break;
    }
  }

  public onMarkDelivered(order: Order, service: OrdersService): void {
    console.log(`onMarkDelivered called`)
    if (order) {
      this.sub$ = service.markOrderDelivered(order.id).subscribe(
        res => console.log(`changed ${res}`),
        err => console.log(`error ${err}`)
      );
    }
  }

  public onMarkPaid(order: Order, service: OrdersService): void {
    if (order) {
      this.sub$ = service.markOrderPaid(order.id).subscribe(
        res => console.log(`changed ${res}`),
        err => console.log(`error ${err}`)
      );
    }
  };

  public onMarkFake(order: Order, service: OrdersService): void {
    if (order) {
      this.sub$ = service.markOrderFake(order.id).subscribe(
        res => console.log(`changed ${res}`),
        err => console.log(`error ${err}`)
      );
    }
  };

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}

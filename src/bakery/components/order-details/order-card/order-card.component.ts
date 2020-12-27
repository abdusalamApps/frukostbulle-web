import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../../../models/order.model';
import {Observable} from 'rxjs';
import * as fromState from 'src/app/state';
import {User} from '../../../../models/user.model';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() order: Order = {
    id: -1,
    sellerId: -1,
    buyerId: -1,
    bakeryId: -1,
    sellerName: '',
    buyerName: '',
    bakeryName: '',
    deliveryMethod: false,
    deliveryTime: 0,
    deliveryDate: '',
    handled: false,
    paid: false,
    delivered: false,
    fake: false,
    content: []
  };

  seller$ = new Observable<User | null>();

  constructor() {
  }

  ngOnInit(): void {
/*
    this.store.dispatch(new fromState.LoadUserById(this.order.sellerId));
    this.seller$ = this.store.select(fromState.getUserById);
*/

  }

  getOrderTotal(orderId: number): number {
    let total = 0;
    for (let item of this.order.content) {
      total += item.item.price * item.amount;
    }
    return total;
    // return this.state.select(fromState.getOrderTotal, {orderId});
  }

}

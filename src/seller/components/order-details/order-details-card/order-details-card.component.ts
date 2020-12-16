import {Component, Input, OnInit} from '@angular/core';
import {Order} from 'src/models/order.model';
import {Item} from '../../../../models/item.model';
import {Observable} from 'rxjs';
import {User} from '../../../../models/user.model';
import {State, Store} from '@ngrx/store';
import * as fromState from '../../../state';

@Component({
  selector: 'app-order-details-card',
  templateUrl: './order-details-card.component.html',
  styleUrls: ['./order-details-card.component.scss']
})
export class OrderDetailsCardComponent implements OnInit {
  @Input() order: Order | null = {
    id: -1,
    sellerId: -1,
    buyerId: -1,
    bakeryId: -1,
    sellerName: '',
    buyerName: '',
    bakeryName: '',
    deliveryMethod: -1,
    deliveryTime: '',
    deliveryDate: '',
    handled: false,
    paid: false,
    delivered: false,
    fake: false,
    content: new Map<Item, number>()
  };

  total = 0;

  buyer$ = new Observable<User | null>();

  constructor(private store: Store<fromState.SellerState>) {
    this.total = this.getOrderTotal();
  }

  ngOnInit(): void {
    if (this.order) {
      this.store.dispatch(new fromState.LoadUserById(this.order.buyerId));
      this.buyer$ = this.store.select(fromState.getUserById);
    }
  }

  getOrderTotal(): number {
    let to = 0;
    if (this.order && this.order.content) {
      for (const [key, value] of this.order.content) {
        console.log(`${key}: ${value}`);
        to += key.price * value;
      }
      return to;
    }
    return -1;
  }

}
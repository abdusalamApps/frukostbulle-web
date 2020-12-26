import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as fromRoot from 'src/app/state';
import * as fromState from '../../state';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {Order} from '../../../models/order.model';
import {User} from '../../../models/user.model';
import * as fromSeller from 'src/seller/state';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  title = 'Beställningens detailer';
  order$ = new Observable<Order>();

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

  sub$ = new Subscription();
  constructor(private rootStore: Store<fromRoot.State>,
              private state: Store<fromState.BakeryState>,
              private store: Store<fromState.BakeryState>) {
  }

  ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }
  ngOnInit(): void {
    this.order$ = this.state.select(fromState.getSelectedOrder);
    // this.order= this.state.dispatch(new fromState.getOrderById())
    if (this.order) {
      this.store.dispatch(new fromSeller.LoadUserById(this.order.sellerId));
      this.seller$ = this.store.select(fromSeller.getUserById);
    }
  }


  navigateBack(): void {
    this.rootStore.dispatch(new fromRoot.Back());
  }
  OnDestroy(): void{
    this.sub$.unsubscribe();

  }

  getOrderTotal(orderId: number): Observable<number> {
    return this.store.select(fromState.getOrderTotal, {orderId});
  }

}

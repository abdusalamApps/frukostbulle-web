import { Component, OnInit } from '@angular/core';
import {ShoppingCartItem} from '../../../models/shoppingCartItem';
import {Observable} from 'rxjs';
import {Order} from '../../../models/order.model';
import * as fromState from '../../state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  title = 'Varukorg';
  orders$ = new Observable<Order[]>();

  amount = 1;
  shoppingCartItems: ShoppingCartItem[] | undefined;
  total = 0;

  deliveryDates = [];
  constructor(private store: Store<fromState.BuyerState>) {}
  ngOnInit(): void {
   // this.orders$ = this.store.select(fromState.getBuyerOrders);
  }
  incrementAmount(itemId: string): void{
  }
  decrementAmount(itemId: string): void{
  }
  onDelete(itemId: string): void{
  }
  onConfirm(): void{
  }
}

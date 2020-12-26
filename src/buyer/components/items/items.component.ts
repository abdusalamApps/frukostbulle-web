import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Item} from 'src/models/item.model';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';
import * as fromRoot from 'src/app/state';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  title = 'Säljarens frallor';

  items$: Observable<Item[]> = new Observable<[]>();
  loading$: Observable<boolean> = new Observable<boolean>();
  loaded$: Observable<boolean> = new Observable<boolean>();
  associatedSellerId$ = new Observable<number | undefined>();

  cartItems: { item: Item, amount: number }[] = [];

  constructor(private store: Store<fromState.BuyerState>,
              private rootStore: Store<fromRoot.State>,
              private snackBar: MatSnackBar) {
    let state = localStorage.getItem('state');
    if (!state) {
      state = '';
    }
    let sellerId = -1;
    sellerId = JSON.parse(state)?.buyer?.currentUser?.currentUser?.associatedSeller;
    if (sellerId > -1) {
      this.store.dispatch(new fromState.LoadItems(sellerId));
    }

  }

  ngOnInit(): void {
    this.items$ = this.store.select(fromState.getSellerItems);
    this.loading$ = this.store.select(fromState.getItemsLoading);
    this.loaded$ = this.store.select(fromState.getItemsLoaded);
    this.associatedSellerId$ = this.store.select(fromState.getAssociatedSellerId);
    if (JSON.parse(<string> localStorage.getItem('cart')) !== null) {
      this.cartItems = JSON.parse(<string> localStorage.getItem('cart'));
    }

  }

  addToCart(item: Item): void {
    let filter = this.cartItems.filter(e => {
      if (e.item.itemId == item.itemId) {
        e.amount++;
      }
      return e.item.itemId == item.itemId;
    });
    if (filter.length <= 0) {
      this.cartItems.push({item: item, amount: 1});
    }
    console.log(this.cartItems);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.snackBar.open(`${item.itemName} har lagts i korgen`,
      'Stäng',
      {duration: 1000})
  }

  getItemsCount(): number {
    let count = 0;
    for(let item of this.cartItems) {
      count += item.amount;
    }
    return count;
  }
}

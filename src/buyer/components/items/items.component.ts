import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Item} from 'src/models/item.model';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';
import * as fromRoot from 'src/app/state';

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

  constructor(private store: Store<fromState.BuyerState>,
              private rootStore: Store<fromRoot.State>) {
    let state = localStorage.getItem('state');
    if (!state) {
      state = '';
    }
    const sellerId = JSON.parse(state).buyer.currentUser.currentUser.associatedSeller;
    if (sellerId > -1) {
      this.store.dispatch(new fromState.LoadItems(sellerId));
    }

  }

  ngOnInit(): void {
    this.items$ = this.store.select(fromState.getSellerItems);
    this.loading$ = this.store.select(fromState.getItemsLoading);
    this.loaded$ = this.store.select(fromState.getItemsLoaded);
    this.associatedSellerId$ = this.store.select(fromState.getAssociatedSellerId);
  }

}

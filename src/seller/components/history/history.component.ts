import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../../../models/order.model';
import * as fromState from '../../state';
import {map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromRoot from 'src/app/state';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  title = 'Historik';

  orders$ = new Observable<Order[]>();

  constructor(private store: Store<fromState.SellerState>,
              ) {
  }

  ngOnInit(): void {
    this.orders$ = this.store.select(fromState.getOrderHistory);
  }

  getOrderTotal(orderId: number): number {
    let theTotal = 0;
    this.store.select(fromState.getOrderTotal, {orderId}).pipe(
      map((total) => {
        theTotal = total;
      }),
      take(1)
    );
    return theTotal;
  }

  public navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }

}

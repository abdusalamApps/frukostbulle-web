import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as fromRoot from 'src/app/state';
import * as fromState from '../../state';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {Order} from '../../../models/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  title = 'Beställningens detailer';
  order$ = new Observable<Order>();

  sub$ = new Subscription();

  constructor(private rootStore: Store<fromRoot.State>,
              private state: Store<fromState.BakeryState>) {
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  ngOnInit(): void {
    this.order$ = this.state.select(fromState.getSelectedOrder);

  }


  navigateBack(): void {
    this.rootStore.dispatch(new fromRoot.Back());
  }

}

import {Component, OnInit} from '@angular/core';
import * as fromRoot from 'src/app/state';
import * as fromState from '../../state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Order} from '../../../models/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order$ = new Observable<Order>();
  constructor(private rootStore: Store<fromRoot.State>,
              private state: Store<fromState.SellerState>) {
  }

  ngOnInit(): void {
    this.order$ = this.state.select(fromState.getSelectedOrder);
  }

  navigateBack(): void {
    this.rootStore.dispatch(new fromRoot.Back());
  }

}

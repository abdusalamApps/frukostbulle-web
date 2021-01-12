import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Order} from '../../../models/order.model';
import * as fromState from '../../state';
import {map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromRoot from 'src/app/state';
import {single} from './data';
import {OrdersService} from '../../services/orders.service';
import {OrderHistory} from '../../../models/order-history.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  title = 'Historik';

  orders$ = new Observable<OrderHistory[]>();

  statisticsSubscription$ = new Subscription();

  statistics: { name: number, value: number }[] = [];

  single: any[] | undefined;
  multi: any[] | undefined;

  view: any[] = [300, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Veckonummer';
  showYAxisLabel = true;
  yAxisLabel = 'Inkomst';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private store: Store<fromState.SellerState>,
              private orderService: OrdersService) {
    Object.assign(this, {single});
  }

  ngOnInit(): void {
    // getting the orders from the history from getOrderHistory selector
    this.orders$ = this.store.select(fromState.getOrderHistory);
    const sellerId = localStorage.getItem('currentUserId');
    if (sellerId) {
      this.statisticsSubscription$ = this.orderService.getStatistics(parseInt(sellerId, 10)).subscribe(
        (res) => {
          console.log(JSON.stringify(res));
          this.statistics = res;
        },
        err => console.log(`statistics error ${err}`)
      );
    }
  }

  ngOnDestroy() {
    this.statisticsSubscription$.unsubscribe();
  }

  onSelect(event: any) {
    console.log(event);
  }

  // calculating a total for an order
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

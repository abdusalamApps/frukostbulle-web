import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../../../models/order.model';
import * as fromState from '../../state';
import {map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromRoot from 'src/app/state';
import { single } from './data';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  title = 'Historik';

  orders$ = new Observable<Order[]>();

  single : any[] | undefined;
  multi : any[] | undefined;

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private store: Store<fromState.SellerState>) {
    Object.assign(this, { single })
  }

  ngOnInit(): void {
    this.orders$ = this.store.select(fromState.getOrderHistory);
  }

  onSelect(event: any) {
    console.log(event);
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

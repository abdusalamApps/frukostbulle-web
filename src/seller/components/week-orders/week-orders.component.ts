import {Component, OnInit} from '@angular/core';
import * as fromState from '../../state';
import {Store} from '@ngrx/store';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-week-orders',
  templateUrl: './week-orders.component.html',
  styleUrls: ['./week-orders.component.scss']
})
export class WeekOrdersComponent implements OnInit {

  constructor(private store: Store<fromState.SellerState>) {
  }

  ngOnInit(): void {

  }

}

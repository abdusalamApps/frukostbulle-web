import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../../app/state';
import {Location} from '@angular/common';
import {Store} from '@ngrx/store';
import * as fromStore from '../../state';

@Component({
  selector: 'app-order-no-login',
  templateUrl: './order-no-login.component.html',
  styleUrls: ['./order-no-login.component.scss']
})
export class OrderNoLoginComponent implements OnInit {
  title = 'Beställning';
  name = '';
  mobile = '';
  street = '';
  city = '';
  county = '';

  constructor(
    public location: Location,
    private store: Store<fromStore.BuyerState>) {}
  ngOnInit(): void {
  }
  navigateHome(): void {
    this.store.dispatch(new fromRoot.Go({path: [''], extras: {replaceUrl: true}}));
  }

  confirmOrder(): void {
  }
}

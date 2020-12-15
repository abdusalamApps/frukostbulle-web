import {Component, OnInit} from '@angular/core';
import * as fromRoot from 'src/app/state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
  }

  navigateBack() {
    this.store.dispatch(new fromRoot.Back());
  }

}

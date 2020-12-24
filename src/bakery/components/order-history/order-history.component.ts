import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-bakery-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],

})
export class OrderHistoryComponent implements OnInit {

  title = 'Order historik';

 // sellers: BakerySellers[] ;
  sellerId = '';

  constructor(location: Location) {
   // this.sellers = [];
  }

  ngOnInit(): void {

  }

}

import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-bakery-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]

})
export class OrderDetailsComponent implements OnInit {
  location: Location;
  title = 'Order details';
  sellerId = '';
 // orderProducts: BakeryWeekSellerOrderDetails | undefined;
  expanded = true;
 // summary: SummaryItem[];
  // details: SummaryItem[];
  constructor(location: Location
     //         private orderDetailsService: OrderDetailsService
                    ) {
    this.location = location;
  //  this.summary = [];
   // this.details = [];
  }

  ngOnInit(): void {
    }


  navigateBack(): void {
    this.location.back();
  }
}

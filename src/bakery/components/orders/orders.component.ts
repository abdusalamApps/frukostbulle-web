import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-bakery-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]

})
export class OrdersComponent implements OnInit {
  title = 'Beställningar';

  location: Location;
  router: Router;
 // sellers: BakerySellers[] ;
  sellerId = '';

  constructor(location: Location,
              router: Router,
             // private authService: AuthService,
             // private orderDetails: OrderDetailsService,
              private aRoute: ActivatedRoute) {
    this.location = location;
    this.router = router;
   // this.sellers = [];
    this.fetchBakeryWeekSellers();

  }

  ngOnInit(): void {
  //  this.orderDetails.currentSellerId$.subscribe(sellerId => this.sellerId = sellerId);
  }
  public navigateBack(): void {
    this.router.navigate(['/login'], {relativeTo: this.aRoute});  }

  fetchBakeryWeekSellers(): void {
  }

  navigateToDetails(sellerId: string): void {
  }

  logOut(): void {
  }

  changePassword(): void{
  }

}

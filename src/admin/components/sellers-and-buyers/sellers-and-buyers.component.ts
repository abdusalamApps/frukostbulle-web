import {Component, OnInit} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sellers-and-buyers',
  templateUrl: './sellers-and-buyers.component.html',
  styleUrls: ['./sellers-and-buyers.component.scss']
})
export class SellersAndBuyersComponent implements OnInit {
  title = 'Välkommen';
  location: Location;
  router: Router;

  constructor(location: Location, router: Router) {
    this.location = location;
    this.router = router;

  }

  public buyerRowClicked(): void {
    // needs to get userId from row
    this.router.navigate(['/manage-buyer']);
  }

  public sellerRowClicked(): void {
    // needs to get userId from row
    this.router.navigate(['/manage-seller']);
  }


  public navigateBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
  }

}

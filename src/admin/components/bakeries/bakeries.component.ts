import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bakeries',
  templateUrl: './bakeries.component.html',
  styleUrls: ['./bakeries.component.scss']
})
export class BakeriesComponent implements OnInit {

  title = 'Bagerier';

  location: Location;
  router: Router;

  constructor(location: Location, router: Router) {
    this.location = location;
    this.router = router;

  }

  ngOnInit(): void {
  }

  public bakeryRowClicked(): void {
    // needs to get userId from row
    this.router.navigate(['/manage-bakery']);
  }

  public navigateBack(): void {
    this.location.back();
  }

  public navigateToSellers(): void {

  }

}

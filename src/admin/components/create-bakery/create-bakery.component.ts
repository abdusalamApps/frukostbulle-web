import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-bakery',
  templateUrl: './create-bakery.component.html',
  styleUrls: ['./create-bakery.component.scss']
})
export class CreateBakeryComponent implements OnInit {
  title = 'Skapa bageriprofil';
  router: Router;
  location: Location;
  hide = true;

  email = '';
  name = '';
  mobile = '';
  enteredPassword = '';
  enteredPassword2 = '';

  constructor(router: Router, location: Location) {
    this.router = router;
    this.location = location;
  }

  ngOnInit(): void {
  }

  public navigateBack(): void {
    this.location.back();
  }

  public createProfile(): void {
    // code
    this.router.navigate(['/sellers'], {replaceUrl: true})
  }
}

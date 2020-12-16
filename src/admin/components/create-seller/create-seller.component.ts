import {Component, OnInit} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-seller',
  templateUrl: './create-seller.component.html',
  styleUrls: ['./create-seller.component.scss']
})
export class CreateSellerComponent implements OnInit {
  title = 'Skapa säljarprofil';
  router: Router;
  location: Location;
  hide = true;

  email = '';
  name = '';
  mobile = '';
  enteredPassword = '';
  enteredPassword2 = '';


  constructor(location: Location, router: Router) {
    this.location = location;
    this.router = router;
  }

  ngOnInit(): void {
  }

  public navigateBack(): void {
    this.location.back();
  }

  public createProfile(): void {
    // code
    this.router.navigate(['/sellers'], {replaceUrl: true});
  }
}

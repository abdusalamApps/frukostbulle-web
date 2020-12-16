import {Component, OnInit} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-seller',
  templateUrl: './manage-seller.component.html',
  styleUrls: ['./manage-seller.component.scss']
})
export class ManageSellerComponent implements OnInit {
  title = 'Hantera säljare';
  router: Router;
  location: Location;
  hide = true;
  enteredPassword = '';
  enteredPassword2 = '';

  constructor(location: Location, router: Router) {
    this.location = location;
    this.router = router;
  }

  ngOnInit(): void {
  }

  changePassword(): void {

  }

  confirmDelete(name: string): void {
    if (confirm('är du säker att du vill ta bort profilen för ' + name + '?')) {
      console.log('Implement delete functionality here');
    }
  }

  public navigateBack(): void {
    this.location.back();
  }

}

import {Component, OnInit} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-buyer',
  templateUrl: './manage-buyer.component.html',
  styleUrls: ['./manage-buyer.component.scss']
})
export class ManageBuyerComponent implements OnInit {
  title = 'Hantera köpare';
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

  public navigateBack(): void {
    this.location.back();
  }

  confirmDelete(name: string): void {
    if (confirm('är du säker att du vill ta bort profilen för ' + name + '?')) {
      console.log('Implement delete functionality here');
    }
  }


}

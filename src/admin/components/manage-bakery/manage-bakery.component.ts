import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-bakery',
  templateUrl: './manage-bakery.component.html',
  styleUrls: ['./manage-bakery.component.scss']
})
export class ManageBakeryComponent implements OnInit {
  title = 'Hantera bageri bagerinamn';
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

  changePassword(): void {

  }

  confirmDelete(name: string): void {
    if (confirm('är du säker att du vill ta bort profilen för ' + name + '?')) {
      console.log('Implement delete functionality here');
    }
  }


}

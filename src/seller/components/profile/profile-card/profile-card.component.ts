import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../models/user.model';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {tap} from 'rxjs/operators';
import {Bakery} from '../../../../models/bakery.model';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['../profile.component.scss']
})
export class ProfileCardComponent {
  @Input() user: User | null = {
    id: -1,
    name: '',
    county:'',
    city: '',
    address: '',
    mobilenbr: '',
    email: '',
    password: '',
    permissionLevel: -1,
    reminder: false,
    associatedBakery: -1,
    active: false,
    availableDates: [new Date('')],
    lasOrderDay: '',
  };

  @Input() associatedBakery: Bakery | null = null;

  @Output() logout = new EventEmitter();

  logoutClick() {
    this.logout.emit();
  }
}


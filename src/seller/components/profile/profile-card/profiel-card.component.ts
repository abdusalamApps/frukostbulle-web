import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/user.model';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {tap} from 'rxjs/operators';

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
    mobilenbr: -1,
    email: '',
    password: '',
    permissionLevel: -1,
    reminder: false,
    associatedBakery: '',
    active: false,
    availableDates: [''],
    lasOrderDay: '',
  };
}


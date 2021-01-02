import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../../../models/user.model';
import {Bakery} from '../../../../models/bakery.model';

// @ts-ignore
@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['../profile.component.scss']
})
export class ProfileCardComponent {
  @Input() user: User | null = {
    id: -1,
    name: '',
    county: '',
    city: '',
    address: '',
    mobilenbr: '',
    email: '',
    password: '',
    permissionLevel: -1,
    reminder: false,
    associatedBakery: -1,
    associatedSeller: -1,
    active: false,
    availableDates: [new Date('')],
    orderBuffer: -1,
    lasOrderDay: '',
    profilePictureUrl: ''
  };

  @Input() associatedBakery: Bakery | null = null;

  @Output() logout = new EventEmitter();

  logoutClick(): void {
    this.logout.emit();
  }
}


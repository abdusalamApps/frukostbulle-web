import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../models/user.model';


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
    active: false,
    availableDates: [new Date('')],
    lasOrderDay: '',
    profilePictureUrl: ''
  };

  @Input() associatedSeller: User | null = null;

  @Output() logout = new EventEmitter();

  logoutClick(): void {
    this.logout.emit();
  }
}


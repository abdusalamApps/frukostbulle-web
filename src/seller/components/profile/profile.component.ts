import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';
import * as fromRoot from '../../../app/state';
import {Observable, of} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userObservable$ = new Observable<User | null>();

  title = 'Min profil';

  file = new File(['nofing'], 'empty file');

  imageSrc: string = 'assets/img/profile-photo-placeholder.png';
  name: string = '';
  email: string = '';
  bakery: string  = '';
  mobile= 0;

  constructor(private store: Store<fromState.SellerState>,
              private rootStore: Store<fromRoot.State>,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.userObservable$ = this.store.select(fromState.getCurrentUser);
  }

  public navigateToProfileEditor(): void {
  }

  onChooseBakery() {
  }

  chooseImage(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      [this.file] = event.target.files;
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        console.log(this.imageSrc);
        console.log(this.file.valueOf());
      };
    }
  }

  logout() {
  }
}

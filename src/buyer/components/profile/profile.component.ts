import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';
import * as fromRoot from '../../../app/state';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userObservable$ = new Observable<User | null>();
 // seller$ = new Observable<User | null>();

  title = 'Min profil';

  file = new File(['nofing'], 'empty file');

  imageSrc = 'assets/img/profile-photo-placeholder.png';

  constructor(private store: Store<fromState.BuyerState>,
              private rootStore: Store<fromRoot.State>,
  ) {
  }

  ngOnInit(): void {
    this.userObservable$ = this.store.select(fromState.getCurrentUser);
    // this.seller$ = this.store.select(fromState.getCurrentUserAssociatedSeller);
  }

  public navigateToProfileEditor(): void {
  }

  chooseImage(event: any): void {
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

  onLogout(): void {
    this.store.dispatch(new fromState.Logout());
  }

}

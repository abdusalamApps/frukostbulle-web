import {Component, OnInit} from '@angular/core';
import * as fromRoot from '../../../app/state';
import {Store} from '@ngrx/store';
import * as fromState from '../../../bakery/state';

@Component({
  selector: 'app-create-seller',
  templateUrl: './create-seller.component.html',
  styleUrls: ['./create-seller.component.scss']
})
export class CreateSellerComponent implements OnInit {
  title = 'Skapa säljarprofil';

  hide = true;

  email = '';
  name = '';
  mobile = '';
  enteredPassword = '';
  enteredPassword2 = '';


  constructor(private store: Store<fromState.BakeryState>) {

  }

  ngOnInit(): void {
  }

  public navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }

  public createProfile(): void {
    this.store.dispatch(new fromRoot.Go({path: ['/sellers'], extras: {replaceUrl: true}}));
  }
}

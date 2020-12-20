import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Store} from '@ngrx/store';
import * as fromStore from '../../state';

@Component({
  selector: 'app-confirmation-no-login',
  templateUrl: './confirmation-no-login.component.html',
  styleUrls: ['./confirmation-no-login.component.scss']
})
export class ConfirmationNoLoginComponent implements OnInit {

  title = 'Bekräftelse';

  constructor(
    public location: Location,
    private store: Store<fromStore.BuyerState>
  ) {
  }
  ngOnInit(): void {
  }

}

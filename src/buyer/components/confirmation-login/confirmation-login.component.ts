import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {LoginInfo} from '../../../models/loginInfo.model';
import {Location} from '@angular/common';
import * as fromStore from '../../state';
import {Observable} from 'rxjs';
import * as fromRoot from '../../../app/state';


@Component({
  selector: 'app-confirmation-login',
  templateUrl: './confirmation-login.component.html',
  styleUrls: ['./confirmation-login.component.scss']
})
export class ConfirmationLoginComponent implements OnInit {
  title = 'Bekräftelse';

  constructor(
    public location: Location,
    private store: Store<fromStore.BuyerState>
  ) {
  }

  ngOnInit(): void {
  }
}

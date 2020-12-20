import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Item} from 'src/models/item.model';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';
import {catchError, map, tap} from 'rxjs/operators';
import {AuthResponse} from '../../../models/authResponse.model';
import * as fromRoot from 'src/app/state';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  title = 'Säljarens frallor';

  items$: Observable<Item[]> = new Observable<[]>();
  loading$: Observable<boolean> = new Observable<boolean>();
  loaded$: Observable<boolean> = new Observable<boolean>();
  email$: Observable<AuthResponse> = new Observable<AuthResponse>();

  constructor(private store: Store<fromState.BuyerState>,
              private rootStore: Store<fromRoot.State>) {

  }

  ngOnInit(): void {
  //  this.items$ = this.store.select(fromState.getAllItems);
  //  this.loading$ = this.store.select(fromState.getItemsLoading);
  //  this.loaded$ = this.store.select(fromState.getItemsLoaded);
  }

}

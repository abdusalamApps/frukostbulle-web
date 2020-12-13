import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from 'src/models/item.model';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';
import {tap} from 'rxjs/operators';
import {AuthResponse} from '../../../models/authResponse.model';
import * as fromRoot from 'src/app/state';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.scss'],
})

export class MyItemsComponent implements OnInit {
  title = 'Mina frallor';

  items$: Observable<Item[]> = new Observable<[]>();
  loading$: Observable<boolean> = new Observable<boolean>();
  loaded$: Observable<boolean> = new Observable<boolean>();
  userId$ = new Observable();
  email$: Observable<AuthResponse> = new Observable<AuthResponse>();

  constructor(private store: Store<fromState.SellerState>,
              private rootStore: Store<fromRoot.State>) {

  }

  ngOnInit(): void {
    this.userId$ = this.store.select(fromState.getCurrentUserId).pipe(
      tap(id => {
        if (id) {
          console.log(`userid: ${id}`);
          this.store.dispatch(new fromState.LoadItems(id));
        }
      })
    );
    this.items$ = this.store.select(fromState.getAllItems);
    this.loading$ = this.store.select(fromState.getItemsLoading);
    this.loaded$ = this.store.select(fromState.getItemsLoaded);
  }
}

import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../models/user.model';
import {Store} from '@ngrx/store';
import * as fromState from 'src/admin/state';
import * as fromRoot from 'src/app/state';

@Component({
  selector: 'app-sellers-and-buyers',
  templateUrl: './sellers-and-buyers.component.html',
  styleUrls: ['./sellers-and-buyers.component.scss']
})
export class SellersAndBuyersComponent implements OnInit {
  title = 'Välkommen';

  buyers$ = new Observable<User[]>();
  sellers$ = new Observable<User[]>();

  constructor(private store: Store<fromState.AdminState>) {}


  public navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }

  ngOnInit(): void {
    this.store.dispatch(new fromState.LoadBuyers());
    this.store.dispatch(new fromState.LoadSellers());
    this.buyers$ = this.store.select(fromState.getBuyers);
    this.sellers$ = this.store.select(fromState.getSellers);
  }


}

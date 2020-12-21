import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {Store} from '@ngrx/store';
import * as fromState from '../../state';
import * as fromRoot from '../../../app/state';
import {Observable, of} from 'rxjs';
import {Bakery} from '../../../models/bakery.model';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.scss']
})
export class SellerDetailsComponent implements OnInit {
  userObservable$ = new Observable<User | null>();
  associatedSeller$ = new Observable<User | null>();
  bakery$ = new Observable<Bakery | null>();

  title = 'Säljarens detaljer';

  constructor(private store: Store<fromState.BuyerState>,
              private rootStore: Store<fromRoot.State>,
  ) {
  }

  ngOnInit(): void {
    this.userObservable$ = this.store.select(fromState.getCurrentUser);
    // this.associatedSeller$ = this.store.select(fromState.getCurrentUserAssociatedSeller);
   // this.bakery$ = this.store.select(fromState.getCurrentUserAssociatedBakery);

  }


}

import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {Store} from '@ngrx/store';
import * as fromState from 'src/buyer/state';
import * as fromRoot from '../../../app/state';
import {Observable, of} from 'rxjs';
import {Bakery} from '../../../models/bakery.model';
import {tap} from 'rxjs/operators';

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

  sellerDates: Date[] = [];
  public dateValue: Date = new Date();

  constructor(private store: Store<fromState.BuyerState>,
              private rootStore: Store<fromRoot.State>) {
  }

  ngOnInit(): void {

    this.userObservable$ = this.store.select(fromState.getSelectedSeller).pipe(
      tap(user => {
        if (user) {
          this.sellerDates = user.availableDates;
        }
      })
    );

    /*    this.associatedSeller$ = this.store.select(fromState.getCurrentUserAssociatedSeller);
        this.bakery$ = this.store.select(fromState.getCurrentUserAssociatedBakery);
    */

  }

  disableDate(args: any) {
    if (!this.contains(args.date)) {
      args.isDisabled = true;
    }
  }

  private contains(date: Date): boolean {
    let formattedCalendarDate = JSON.stringify(date.toJSON()).split('T')[0].substring(1);
    for (let i = 0; i < this.sellerDates.length; i++) {
      if (formattedCalendarDate === this.sellerDates[i].toString()) {
        return true;
      }
    }
    return false;
  }

  associateSeller(sellerId: number): void {
    const state = localStorage.getItem('state');
    if (state) {
      const buyerId = parseInt(JSON.parse(state).buyer.currentUser.currentUser.id, 10);
      console.log(`buyerId: ${
        JSON.parse(state).buyer.currentUser.currentUser.id
      }`);
      this.store.dispatch(new fromState.BuyerUpdateSeller({
        buyerId,
        sellerId
      }));
      this.store.dispatch(new fromState.LoadItems(sellerId));
      this.store.dispatch(new fromRoot.Go({path: ['buyer/items']}));
    }
  }

  navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }

}

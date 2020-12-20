import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import * as fromState from '../../state';
import * as fromRoot from 'src/app/state';
import {Store} from '@ngrx/store';
import {take, tap} from 'rxjs/operators';

// @ts-ignore
@Component({
  selector: 'app-choose-days',
  templateUrl: './choose-days.component.html',
  styleUrls: ['./choose-days.component.scss']
})
export class ChooseDaysComponent implements OnInit, OnDestroy {

  title = 'Välj dagar';

  public dateValues$ = new Observable<Date[] | undefined>();
  public multiSelect = true;
  public newDates: Date[] = [];

  userId$ = new Observable();

  constructor(private store: Store<fromState.SellerState>) {
    this.dateValues$ = this.store.select(fromState.getCurrentUserAvailableDates).pipe(
      tap(dates => {
        if (dates) {
          this.newDates = dates;
        }
      }),
      take(1)
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.store.select(fromState.getCurrentUserAvailableDates).subscribe().unsubscribe();
  }

  onSave(): void {
    const id = localStorage.getItem('currentUserId');
    if (id) {
      this.store.dispatch(new fromState.UpdateDates(parseInt(id, 10), this.newDates));
    }
  }

  navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }
}

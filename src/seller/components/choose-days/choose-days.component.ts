import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import * as fromState from '../../state';
import * as fromRoot from 'src/app/state';
import {Store} from '@ngrx/store';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-choose-days',
  templateUrl: './choose-days.component.html',
  styleUrls: ['./choose-days.component.scss']
})
export class ChooseDaysComponent implements OnInit {

  title = 'Välj dagar';

  public dateValues$ = new Observable<Date[] | undefined>();
  public multiSelect: Boolean = true;
  public newDates: Date[] = [];

  userId$ = new Observable();

  constructor(private store: Store<fromState.SellerState>) {

  }

  ngOnInit(): void {
    this.dateValues$ = this.store.select(fromState.getCurrentUserAvailableDates).pipe(
      tap((dates: Date[] | undefined) => {
        if (dates) {
          console.log(`dates: ${dates}`)
          this.newDates = dates;
        }
      })
    );
  }

  onSave(): void {
    console.log(`new dates: ${this.newDates}`)
    this.userId$ = this.store.select(fromState.getCurrentUserId).pipe(
      tap((userId: number | undefined) => {
        if (userId) {
          this.store.dispatch(new fromState.UpdateDates(userId, this.newDates))
        }
      })
    )
  }

  navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }
}

import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Bakery} from '../../../models/bakery.model';
import * as fromState from '../../state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-bakeries',
  templateUrl: './bakeries.component.html',
  styleUrls: ['./bakeries.component.scss']
})
export class BakeriesComponent implements OnInit {

  title = 'Bagerier';
  bakeries$ = new Observable<Bakery[]>();


  constructor(private store: Store<fromState.AdminState>) {}


  ngOnInit(): void {
    this.store.dispatch(new fromState.LoadBakeries());
    this.bakeries$ = this.store.select(fromState.getBakeries);
  }
}

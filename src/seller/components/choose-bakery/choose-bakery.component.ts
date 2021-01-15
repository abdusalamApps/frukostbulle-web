import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {CitiesService} from '../../services/cities.service';
import {Observable} from 'rxjs';
import * as fromRoot from 'src/app/state';
import * as fromState from '../../state';
import {Store} from '@ngrx/store';
import {Bakery} from '../../../models/bakery.model';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-choose-bakery',
  templateUrl: './choose-bakery.component.html',
  styleUrls: ['./choose-bakery.component.scss']
})
export class ChooseBakeryComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;

  title = 'Välj bageri';
  panelOpenState = false;

  cities: string[] = [];
  counties: string[] = [];

  bakeries$ = new Observable<Bakery[]>();
  sellerId$ = new Observable();
  constructor(private citiesService: CitiesService,
              private store: Store<fromState.SellerState>) {
  }

  ngOnInit(): void {
    // dispatching the action LoadBakeries to request the bakeries from the backend
    this.store.dispatch(new fromState.LoadBakeries());
    // selecting the bakeries list from the state
    // and assigning it to an observable variable
    this.bakeries$ = this.store.select(fromState.getAllBakeries);
    // citiesService gets the list of all counties and cities
    // in sweden from a json file src/se.json
    this.counties = this.citiesService.getCounties();

    this.sellerId$ = this.store.select(fromState.getCurrentUserId);
  }

  public navigateBack(): void {
    // to navigate to the previous page the action Back()
    // is dispatched from the app's global state
    this.store.dispatch(new fromRoot.Back());
  }

  // when an list item is clicked the action AssociateBakery
  // gets dispatched
  onListItemClick(bakeryId: number, sellerId: number): void {
    // getting the current user id (seller id) that is needed
    // for AssociateBakery action asynchronously from the selector
    this.store.dispatch(new fromState.AssociateBakery({
      bakeryId,
      sellerId
    }));

  }

  getBakeriesByCounty(county: string): void {
    console.log(county);
    this.cities = this.citiesService.getCitiesByCounty(county);
    this.bakeries$ = this.store.select(fromState.getBakeriesByCounty, {county});
  }

  getBakeriesByCity(city: string): void {
    this.bakeries$ = this.store.select(fromState.getBakeriesByCity, {city});
  }

  findBakeryByName(name: string): void {
    this.bakeries$ = this.store.select(fromState.getBakeriesByName, {name});
  }

}

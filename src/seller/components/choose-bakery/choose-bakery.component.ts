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
    this.store.dispatch(new fromState.LoadBakeries());
    this.bakeries$ = this.store.select(fromState.getAllBakeries);
    this.counties = this.citiesService.getCounties();
  }

  public navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }

  onListItemClick(bakeryId: number): void {
    this.sellerId$ = this.store.select(fromState.getCurrentUserId).pipe(
      tap(sellerId => {
        if (sellerId) {
          this.store.dispatch(new fromState.AssociateBakery({
            bakeryId: bakeryId,
            sellerId: sellerId
          }));
        }
      })
    );

  }

  getBakeriesByCounty(county: string) {
    console.log(county);
    this.cities = this.citiesService.getCitiesByCounty(county);
  }

  getBakeriesByCity(city: string) {
  }

  findBakeryByName(name: string) {
  }


}

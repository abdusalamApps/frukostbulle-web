import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {MapsAPILoader} from '@agm/core';
import {LocationService} from '../../../app/services/location.service';
import {Area} from '../../../models/area.model';
import {AreaService} from '../../../seller/services/area.service';
import * as fromState from 'src/buyer/state';
import * as fromRoot from 'src/app/state';
import {Store} from '@ngrx/store';

declare const google: any;

export class Point {
  latitude: number;
  longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export class Polygon {
  sellerId: string;
  paths: Point[];

  constructor(sellerId: string, paths: Point[]) {
    this.sellerId = sellerId;
    this.paths = paths;
  }
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]

})
export class MapComponent implements OnInit {

  @ViewChild('search')
  public searchElementRef: ElementRef | undefined;

  username = 'User';
  lat = 0;
  lng = 0;
  zoom = 0;
  address = '';
  private geoCoder: any;

  areas: Area[] = [];

  constructor(private mapsLoader: MapsAPILoader,
              private ngZone: NgZone,
              private locationService: LocationService,
              private areaService: AreaService,
              private store: Store<fromState.BuyerState>) {
  }

  ngOnInit(): void {
    this.locationService.getCurrentLocation();
    this.locationService.currentLat$.subscribe(lat => {
      this.lat = lat;
    });
    this.locationService.currentLng$.subscribe(lng => {
      this.lng = lng;
    });

    this.mapsLoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
      this.getAddress(this.lat, this.lng);
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef !== undefined
          ? this.searchElementRef.nativeElement
          : console.log(`search element undefined`)
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = autocomplete.getPlace();
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
    this.areaService.getAllAreas().subscribe(
      result => this.areas = result,
      error => {
        console.log(`getAreas error ${JSON.stringify(error)}`);
      }
    );
  }


  getAddress(latitude: number, longitude: number): void {
    this.geoCoder.geocode({location: {lat: latitude, lng: longitude}}, (results: { formatted_address: string; }[], status: string) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  public navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }
  associateSeller(sellerId: number): void {
    console.log(`toSellerItems ${sellerId}`);
    const buyerIdStorage = localStorage.getItem('currentUserId');
    if (buyerIdStorage) {
      console.log(`buyerId: ${buyerIdStorage}`);
      const buyerId = parseInt(buyerIdStorage, 10);
      this.store.dispatch(new fromState.BuyerUpdateSeller({
         buyerId,
        sellerId
      }));
    }
  }

}

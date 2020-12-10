import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LatLngLiteral } from '@agm/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {
    this.getCurrentLocation();
  }

  private latSource = new Subject<number>();
  private lngSource = new Subject<number>();
  private latLngSource = new Subject<LatLngLiteral>();

  currentLat$ = this.latSource.asObservable();
  currentLng$ = this.lngSource.asObservable();
  currentLatLng$ = this.latLngSource.asObservable();

  getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((position) => {
        console.log('lat: ' + position.coords.latitude);
        console.log('lng: ' + position.coords.longitude);
        this.latSource.next(
          parseFloat(position.coords.latitude.toPrecision(15))
        );
        this.lngSource.next(
          parseFloat(position.coords.longitude.toPrecision(15))
        );
        this.latLngSource.next({
          lat: parseFloat(position.coords.latitude.toPrecision(15)),
          lng: parseFloat(position.coords.longitude.toPrecision(15)),
        });
      });
    }
  }
}

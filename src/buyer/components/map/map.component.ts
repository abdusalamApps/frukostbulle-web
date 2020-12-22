import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {LatLngLiteral, MapsAPILoader, PolyMouseEvent} from '@agm/core';
import {LocationService} from '../../../app/services/location.service';

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
  zoom = 0 ;
  address = '';
  private geoCoder: any;

  polygon: LatLngLiteral[] = [
    /*{lat: 55.8703477, lng: 12.8300802},
    {lat: 55.8703477, lng: 12.8310802},
    {lat: 55.8723579, lng: 12.8300802},
    {lat: 55.8703477, lng: 12.8300802},*/
  ];

  polygons: Polygon[] = [
    new Polygon('2', [new Point(2, 2), new Point(3, 3)])
  ];
  paths: { lat: number, lng: number }[] = [];

  constructor(private router: Router,
              private location: Location,
              private mapsLoader: MapsAPILoader,
              private ngZone: NgZone,
              private locationService: LocationService,
              private aRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.locationService.getCurrentLocation();
    this.locationService.currentLat$.subscribe(lat => {
      this.lat = lat;
    });
    this.locationService.currentLng$.subscribe(lng => {
      this.lng = lng;
    });
    this.locationService.currentLatLng$.subscribe(latLng => {
      this.polygon = [];
      this.polygon.push({lat: latLng.lat - 0.001, lng: latLng.lng - 0.001 });
      this.polygon.push({lat: latLng.lat + 0.004, lng: latLng.lng - 0.001 });
      this.polygon.push({lat: latLng.lat + 0.004, lng: latLng.lng + 0.004});
      this.polygon.push({lat: latLng.lat - 0.001, lng: latLng.lng + 0.004});
    })


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
    this.location.back();
  }


  click($event: PolyMouseEvent): void {
    this.router.navigate(
      ['/buyer/seller-details'],
      {relativeTo: this.aRoute});
  }

}

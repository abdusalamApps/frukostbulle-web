import {
  Component,
  ElementRef,
  NgZone, OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {LocationService} from 'src/app/services/location.service';
import {MatAccordion} from '@angular/material/expansion';
import {tap} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {Bakery} from '../../../models/bakery.model';
import {CitiesService} from '../../services/cities.service';
import {Store} from '@ngrx/store';
import {PermissionLevel, User} from '../../../models/user.model';
import {BakeryService} from '../../services/bakery.service';
import {UsersService} from '../../services/users.service';
import * as fromState from '../../state';
import * as fromRoot from 'src/app/state';
import {AreaService} from '../../services/area.service';

declare const google: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  @ViewChild('search')
  public searchElementRef: ElementRef | undefined;

  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;

  title = 'Skapa profil';
  hide = true;
  panelOpenState = false;

  email = '';
  name = '';
  mobile = '';
  enteredPassword = '';
  enteredPassword2 = '';

  isLinear = false;

  lat = 0;
  lng = 0;
  zoom = 10;
  address = '';
  city = '';
  county = '';

  private geoCoder: any;

  pointList: { lat: number; lng: number }[] = [];
  drawingManager: any;
  selectedShape: any;
  selectedArea = 0;

  emailControl = new FormControl('', [Validators.email]);
  mobileControl = new FormControl(0, [
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);

  cities: string[] = [];
  counties: string[] = [];

  bakeries$ = new Observable<Bakery[]>();
  sellerId$ = new Observable();

  selectedBakery: Bakery | null = null;
  selectedDates: Date[] = [];
  multiSelect = true;

  userSubscription$ = new Subscription();
  areaSubscription$ = new Subscription();

  constructor(private router: Router,
              public location: Location,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute,
              private locationService: LocationService,
              private mapsLoader: MapsAPILoader,
              private ngZone: NgZone,
              private citiesService: CitiesService,
              private store: Store<fromState.SellerState>,
              private userService: UsersService,
              private areaService: AreaService
  ) {
  }

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe();
    this.areaSubscription$.unsubscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(new fromState.LoadBakeries());
    this.bakeries$ = this.store.select(fromState.getAllBakeries);
    this.counties = this.citiesService.getCounties();

    this.locationService = new LocationService();
    this.locationService.currentLat$.subscribe((lat) => {
      this.lat = lat;
    });
    this.locationService.currentLng$.subscribe((lng) => {
      this.lng = lng;
    });
    this.mapsLoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
      this.getAddress(this.lat, this.lng);
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef !== undefined
          ? this.searchElementRef.nativeElement
          : console.log(`search element undefined`)
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
          this.getAddress(this.lat, this.lng);
        });
      });
    });
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode(
      {location: {lat: latitude, lng: longitude}},
      (results: { formatted_address: string }[], status: string) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
            console.log(`address: ${this.address}`);
            this.city = this.address.split(' ')[4].replace(',', '');
            console.log(`address city: ${this.city}`);
            this.setCounty();
            console.log(`address county: ${this.county}`)
          } else {
            this.snackBar.open('No results found',
              'Ok', {duration: 2000});
          }
        } else {
          this.snackBar.open(`Geocoder failed due to: ${status}`,
            'Ok', {duration: 2000});
        }
      }
    );
  }

  onCreate(): void {
    if (this.enteredPassword != this.enteredPassword2
      || this.email == ''
      || this.name == ''
      || this.mobile == ''
      || this.selectedBakery === null) {
      this.snackBar.open('Rätta felen.', 'Ok', {
        duration: 2000,
      });
    } else {
      if (this.selectedBakery) {
        const newUser: User = {
          id: -1,
          name: this.name,
          county: '',
          city: '',
          address: this.address,
          mobilenbr: this.mobile,
          email: this.email,
          password: this.enteredPassword,
          permissionLevel: PermissionLevel.SELLER,
          reminder: false,
          associatedBakery: this.selectedBakery.id,
          active: false,
          availableDates: this.selectedDates,
          lasOrderDay: '',
          profilePictureUrl: ''
        };
        this.userSubscription$ = this.userService.createUser(newUser, this.pointList).subscribe(
          res => {
            this.store.dispatch(new fromRoot.Go({path: ['seller/signup-confirmation']}));
            console.log(`createUser res: ${res}`);
          },
          err => {
            console.log(`createUser error: ${err}`);
            this.snackBar.open(`Fel: ${err}`, 'Ok', {duration: 2000});
          }
        );
      }
    }
  }

  onMapReady(map: any): void {
    this.initDrawingManager(map);
  }

  initDrawingManager = (map: any) => {
    const self = this;
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ['polygon'],
      },
      polygonOptions: {
        draggable: true,
        editable: true,
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
    };
    this.drawingManager = new google.maps.drawing.DrawingManager(options);
    this.drawingManager.setMap(map);
    google.maps.event.addListener(
      this.drawingManager,
      'overlaycomplete',
      (event: {
        type: any;
        overlay: { getPaths: () => any; drag: any; getPath: () => any };
      }) => {
        if (event.type === google.maps.drawing.OverlayType.POLYGON) {
          const paths = event.overlay.getPaths();
          for (let p = 0; p < paths.getLength(); p++) {
            google.maps.event.addListener(paths.getAt(p), 'set_at', () => {
              if (!event.overlay.drag) {
                self.updatePointList(event.overlay.getPath());
              }
            });
            google.maps.event.addListener(paths.getAt(p), 'insert_at', () => {
              self.updatePointList(event.overlay.getPath());
            });
            google.maps.event.addListener(paths.getAt(p), 'remove_at', () => {
              self.updatePointList(event.overlay.getPath());
            });
          }
          self.updatePointList(event.overlay.getPath());
          this.selectedShape = event.overlay;
          this.selectedShape.type = event.type;
        }
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          // Switch back to non-drawing mode after drawing a shape.
          self.drawingManager.setDrawingMode(null);
          // To hide:
          self.drawingManager.setOptions({
            drawingControl: false,
          });
        }
      }
    );
  };

  deleteSelectedShape() {
    if (this.selectedShape) {
      this.selectedShape.setMap(null);
      this.selectedArea = 0;
      this.pointList = [];
      // To show:
      this.drawingManager.setOptions({
        drawingControl: true,
      });
    }
  }

  updatePointList(path: {
    getLength: () => any;
    getAt: (arg0: number) => {
      (): any;
      new(): any;
      toJSON: { (): { lat: number; lng: number }; new(): any };
    };
  }) {
    this.pointList = [];
    const len = path.getLength();
    for (let i = 0; i < len; i++) {
      this.pointList.push(path.getAt(i).toJSON());
    }
    this.selectedArea = google.maps.geometry.spherical.computeArea(path);
  }

  onListItemClick(bakery: Bakery): void {
    this.selectedBakery = bakery;
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

  setCounty(): void {
    let counties = this.citiesService.getCounties();
    for(let county of counties) {
      let cities = this.citiesService.getCitiesByCounty(county);
      for(let ci of cities) {
        if (ci === this.city) {
          this.county = county;
          return;
        }
      }

    }
  }

}

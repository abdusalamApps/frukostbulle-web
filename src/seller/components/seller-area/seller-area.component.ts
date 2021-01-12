import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LocationService} from 'src/app/services/location.service';
import * as fromRoot from 'src/app/state';
import * as fromState from '../../state';

import {Store} from '@ngrx/store';
import {tap} from 'rxjs/operators';
import {Area} from '../../../models/area.model';
import {Observable} from 'rxjs';
import {MapsAPILoader} from '@agm/core';

declare const google: any;

// a map that shows the logged in seller's area and enables
// the seller to edit the area
@Component({
  selector: 'app-seller-area',
  templateUrl: './seller-area.component.html',
  styleUrls: ['./seller-area.component.scss']
})
export class SellerAreaComponent implements OnInit, OnDestroy {
  @ViewChild('search')
  public searchElementRef: ElementRef | undefined;

  title = 'Säljare i ditt område';

  username = 'User';
  lat = 0;
  lng = 0;
  pointList: { lat: number; lng: number }[] = [];
  drawingManager: any;
  selectedShape: any;
  selectedArea = 0;

  observableId$ = new Observable();

  area$ = new Observable<Area | null>();
  coordinates$ = new Observable<{ lat: number, lng: number }[] | null>();

  editing = false;
  map: any;

  address = '';
  private geoCoder: any;
  zoom = 10;

  constructor(private locationService: LocationService,
              private store: Store,
              private mapsLoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.locationService = new LocationService();
    this.locationService.currentLat$.subscribe(v => {
      this.lat = v;
    });
    this.locationService.currentLng$.subscribe(v => {
      this.lng = v;
    });
    this.area$ = this.store.select(fromState.getCurrentUserArea);

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
        });
      });
    });

  }

  // decode latitude and longitude to an address
  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results: { formatted_address: string }[], status: string) => {
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
      }
    );
  }

  // unsubscribe to prevent performance and memory leak
  ngOnDestroy(): void {
    this.locationService.currentLat$.subscribe().unsubscribe();
    this.locationService.currentLng$.subscribe().unsubscribe();
  }

  public navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }

  // called when edit button is clicked
  onEdit(): void {
    this.editing = !this.editing;
    if (this.editing) {
      this.initDrawingManager(this.map);
    }
    if (!this.editing) {
      this.deleteSelectedShape();
      this.drawingManager.setDrawingMode(null);
      // To hide:
      this.drawingManager.setOptions({
        drawingControl: false,
      });
    }
  }

  onMapReady(map: any): void {
    this.map = map;
    if (this.editing) {
      this.initDrawingManager(map);
    }
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
      this.drawingManager, 'overlaycomplete', (event: any) => {
        if ((event.type === google.maps.drawing.OverlayType.POLYGON)) {
          const paths = event.overlay.getPaths();
          for (let p = 0; p < paths.getLength(); p++) {
            google.maps.event.addListener(
              paths.getAt(p), 'set_at', () => {
                if (!event.overlay.drag) {
                  self.updatePointList(event.overlay.getPath());
                }
              }
            );
            google.maps.event.addListener(
              paths.getAt(p), 'insert_at', () => {
                self.updatePointList(event.overlay.getPath());
              }
            );
            google.maps.event.addListener(
              paths.getAt(p), 'remove_at', () => {
                self.updatePointList(event.overlay.getPath());
              }
            );
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

  // called when delete button is clicked
  deleteSelectedShape(): void {
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

  updatePointList(path: any): void {
    this.pointList = [];
    const len = path.getLength();
    for (let i = 0; i < len; i++) {
      this.pointList.push(
        path.getAt(i).toJSON()
      );
    }
    this.selectedArea = google.maps.geometry.spherical.computeArea(
      path
    );
  }

  // called when save button is clicked
  onSave(): void {
    const userId = localStorage.getItem('currentUserId');
    if (userId) {
      const newArea: Area = {sellerId: parseInt(userId, 10), coordinates: this.pointList};
      this.store.dispatch(new fromState.UpdateArea(newArea));
    }
    console.log(this.pointList);
  }

}

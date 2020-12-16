import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocationService} from 'src/app/services/location.service';
import * as fromRoot from 'src/app/state';
import * as fromState from '../../state';

import {Store} from '@ngrx/store';
import {tap} from 'rxjs/operators';
import {Area} from '../../../models/area.model';
import {Observable} from 'rxjs';

declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
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

  editing = false;
  map: any;

  constructor(private locationService: LocationService,
              private store: Store) {
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
  }

  ngOnDestroy(): void {
    this.locationService.currentLat$.subscribe().unsubscribe();
    this.locationService.currentLng$.subscribe().unsubscribe();
  }

  public navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
  }

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

  invalidateDrawingManger = (map: any) => {
    const self = this;
    const options = {
      drawingControl: false,
      drawingControlOptions: {
        drawingModes: null,
      },
      polygonOptions: {
        draggable: false,
        editable: false,
      },
      drawingMode: null,
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

  onSave(): void {
    const userId = localStorage.getItem('currentUserId');
    if (userId) {
      const newArea: Area = {sellerId: parseInt(userId, 10), coordinates: this.pointList};
      this.store.dispatch(new fromState.UpdateArea(newArea));
    }
    console.log(this.pointList);
  }

}

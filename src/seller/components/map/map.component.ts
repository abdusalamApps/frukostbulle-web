import {Component, OnInit} from '@angular/core';
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
export class MapComponent implements OnInit {
  title = 'Säljare i ditt område';

  username = 'User';
  lat = 0;
  lng = 0;
  pointList: { lat: number; lng: number }[] = [];
  drawingManager: any;
  selectedShape: any;
  selectedArea: number = 0;

  observableId$ = new Observable();

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
  }

  public navigateBack(): void {
    this.store.dispatch(new fromRoot.Back());
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
      (event: { type: any; overlay: { getPaths: () => any; drag: any; getPath: () => any; }; }) => {
        if (event.type === google.maps.drawing.OverlayType.POLYGON) {
          const paths = event.overlay.getPaths();
          for (let p = 0; p < paths.getLength(); p++) {
            google.maps.event.addListener(
              paths.getAt(p),
              'set_at',
              () => {
                if (!event.overlay.drag) {
                  self.updatePointList(event.overlay.getPath());
                }
              }
            );
            google.maps.event.addListener(
              paths.getAt(p),
              'insert_at',
              () => {
                self.updatePointList(event.overlay.getPath());
              }
            );
            google.maps.event.addListener(
              paths.getAt(p),
              'remove_at',
              () => {
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

  onSave() {
    this.observableId$ = this.store.select(fromState.getCurrentUserId).pipe(
      tap(id => {
        if (id) {
          const newArea: Area = {sellerId: id, coordinates: this.pointList};
          this.store.dispatch(new fromState.UpdateArea(newArea));
        }
      })
    );
    console.log(this.pointList);
  }

}

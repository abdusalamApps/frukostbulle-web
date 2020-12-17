import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LatLngLiteral} from '@agm/core';
import {Area} from '../../../../models/area.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() lat = 0;
  @Input() lng = 0;
  @Input() area: Area = {sellerId: -1, coordinates: [{lat: 0, lng: 0}]};
  @Input() coordinates: LatLngLiteral[] = [];
  @Input() editing = false;

  @Output() mapReady = new EventEmitter();
  @Output() navigateBack = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onMapReady(event: any): void {
    this.mapReady.emit(event);
  }

}

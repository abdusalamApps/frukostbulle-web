interface Pos {
  lat: number;
  lng: number;
}

export interface Area {
  sellerId: number;
  coordinates: Pos[];
}

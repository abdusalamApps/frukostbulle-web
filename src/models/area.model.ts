interface Pos {
  lat: number;
  lon: number;
}

export interface Area {
  sellerId: number;
  coordinates: Pos[];
}

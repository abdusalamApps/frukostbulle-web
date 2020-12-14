import { baseUrl } from './base';
export namespace Get {
  export const getBakeries = `${baseUrl}/get-all-bakeries`;
  export const getBakeriesByCity = `${baseUrl}/get-bakeries-by-city?city=`;
  export const getBakeriesByCounty = `${baseUrl}/get-bakeries-by-county?county=`;
}

export namespace Post {
  // Body: sellerId, bakeryId
  export const associateBakery = `${baseUrl}/associate-bakery`;
}

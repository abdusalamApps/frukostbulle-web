import {baseUrl} from './base';

export namespace Get {
  export const getBakeriesUrl = `${baseUrl}/get-all-bakeries`;
  export const getBakeriesByCityUrl = `${baseUrl}/get-bakeries-by-city?city=`;
  export const getBakeriesByCountyUrl = `${baseUrl}/get-bakeries-by-county?county=`;
  export const getBakeryByIdUrl = `${baseUrl}/get-bakery-by-id?bakeryId=`;
  export const getBakeryByIdSellerUrl = `${baseUrl}/get-bakery-by-sellerId?sellerId=`;
}

export namespace Post {
  // Body: sellerId, bakeryId
  export const associateBakeryUrl = `${baseUrl}/associate-bakery`;
}

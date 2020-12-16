import { baseUrl } from './base';

// tslint:disable-next-line:no-namespace
export namespace Get {
  export const getAreasUrl = `${baseUrl}/get-areas`;
  export const getAreaBySellerIdUrl = `${baseUrl}/get-area-by-seller?seller-id=`;
}

// tslint:disable-next-line:no-namespace
export namespace Post {
  export const createAreaUrl = `${baseUrl}/create-area`;
  export const updateAreaUrl = `${baseUrl}/update-area`;
  export const deleteAreaUrl = `${baseUrl}/delete-area`;
}

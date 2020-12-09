import { baseUrl } from './base';

export namespace Get {
  export const getAreasUrl = `${baseUrl}/get-areas`;
  export const getAreaBySellerIdUrl = `${baseUrl}/get-area-by-seller`;
}

export namespace Post {
  export const createAreaUrl = `${baseUrl}/create-area`;
  export const updateAreaUrl = `${baseUrl}/update-area`;
  export const deleteAreaUrl = `${baseUrl}/delete-area`;
}

import { baseUrl } from './base';

export namespace Get {
  export const getItemById = `${baseUrl}/get-item`;
  export const getItemBySellerId = `${baseUrl}/get-item-by-seller`;
  export const getAllItemsUrl = `${baseUrl}/get-all-items`;
}

export namespace Post {
  export const insertItemUrl = `${baseUrl}/insert-item`;
  export const updateItemUrl = `${baseUrl}/update-item`;
  export const deleteItemUrl = `${baseUrl}/delete-item`;
}

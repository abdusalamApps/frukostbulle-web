import { baseUrl } from './base';

export namespace Get {
  export const getOrderByIdUrl = `${baseUrl}/get-orders-buyerid`;
  export const getReceipByOrderIdtUrl = `${baseUrl}/get-receipt`;
  export const getAllOrdersUrl = `${baseUrl}/get-all-orders`;
  export const getOrdersBySellerIdUrl = `${baseUrl}/get-orders-sellerid`;
  export const getOrdersByBuyerIdUrl = `${baseUrl}/get-orders-buyerid`;
}

export namespace Post {
  // takes in an Order-object
  export const archiveOrderUrl = `${baseUrl}/archive-order`;
  export const insertOrderUrl = `${baseUrl}/insert-order`;
  export const updateOrderUrl = `${baseUrl}/update-order`;
  export const deleteOrderUrl = `${baseUrl}/delete-order`;
}

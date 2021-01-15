import { baseUrl } from './base';

export namespace Get {
  export const getOrderByIdUrl = `${baseUrl}/get-orders-buyerid`;
  export const getReceiptByOrderIdtUrl = `${baseUrl}/get-receipt`;
  export const getAllOrdersUrl = `${baseUrl}/get-all-orders`;
  export const getOrdersBySellerIdUrl = `${baseUrl}/get-orders-sellerid?id=`;
  export const getOrdersByBuyerIdUrl = `${baseUrl}/get-orders-buyerid`;
  export const getOrdersByBakeryIdUrl = `${baseUrl}/get-orders-bakeryid?id=`;
  export const gerOrderHistoryBySellerIdUrl = `${baseUrl}/get-order-history-by-sellerId?sellerId=`;
  export const gerOrderHistoryByBuyerIdUrl = `${baseUrl}/get-order-history-by-buyerId?buyerId=`;
  export const gerOrderHistoryByBakeryIdUrl = `${baseUrl}/get-order-history-by-bakeryId?bakeryId=`;

  export const gerSellerStatisticsUrl = `${baseUrl}/get-seller-statistics`;

  export const sellerPdfUrl = `${baseUrl}/get-seller-pdf`;
  export const bakeryPdfUrl = `${baseUrl}/get-bakery-pdf`;
}

export namespace Post {
  // takes in an Order-object
  export const archiveOrderUrl = `${baseUrl}/archive-order`;
  export const insertOrderUrl = `${baseUrl}/insert-order`;
  export const updateOrderUrl = `${baseUrl}/update-order`;
  export const deleteOrderUrl = `${baseUrl}/delete-order`;

  export const markOrderPaidUrl = `${baseUrl}/mark-order-paid?orderId=`;
  export const markOrderDeliveredUrl = `${baseUrl}/mark-order-delivered?orderId=`;
  export const markOrderFakeUrl = `${baseUrl}/mark-order-fake?orderId=`;
}

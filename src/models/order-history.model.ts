import {Item} from './item.model';

export interface OrderHistory {
  orderId: number;

  sellerName: string;
  bakeryName: string;
  buyerName: string;

  buyerEmail: string;
  buyerNumber: string;

  deliveryMethod: boolean;
  deliveryTime: number;
  deliveryDate: string;

  handled: boolean;
  paid: boolean;
  delivered: boolean;
  fake: boolean;

  items: string;
  price: number;
  sellerId: number;
  bakeryId: number;
  buyerId: number;

}

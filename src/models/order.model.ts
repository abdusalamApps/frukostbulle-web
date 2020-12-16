import {Item} from './item.model';

export interface Order {
  id: number;
  sellerId: number;
  buyerId: number;
  bakeryId: number;
  sellerName: string;
  buyerName: string;
  bakeryName: string;
  deliveryMethod: number;
  deliveryTime: string;
  deliveryDate: string;
  handled: boolean;
  paid: boolean;
  delivered: boolean;
  fake: boolean;
  content: Map<Item, number>;
}

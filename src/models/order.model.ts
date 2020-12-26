import {Item} from './item.model';

export interface Order {
  id: number;
  sellerId: number;
  buyerId: number;
  bakeryId: number;
  sellerName: string;
  buyerName: string;
  bakeryName: string;
  deliveryMethod: boolean;
  deliveryTime: number;
  deliveryDate: string;
  handled: boolean;
  paid: boolean;
  delivered: boolean;
  fake: boolean;
  content: { item: Item, amount: number }[];
}

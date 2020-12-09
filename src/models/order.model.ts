import { Item } from './item.model';

export interface Order {
  id: number;
  sellerId: number;
  buyerId: number;
  bakeryId: number;
  deliveryMethod: boolean;
  deliveryTime: string;
  deliveryDate: string;
  handled: boolean;
  paid: boolean;
  delivered: boolean;
  fake: boolean;
  content: Map<Item, number>;
}

import { Item } from './item.model';

export interface Receipt {
  orderId: number;
  total: number;
  content: Map<Item, number>;
}

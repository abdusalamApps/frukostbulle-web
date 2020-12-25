import {BuyerLoginEffect} from './buyer-login.effect';
import {CurrentUserEffect} from './currentUser.effect';
import {SelectedSellerEffect} from './selected-seller.effect';
import {OrderEffect} from './order.effect';

export const effects: any[] = [
  BuyerLoginEffect,
  CurrentUserEffect,
  SelectedSellerEffect,
  OrderEffect
];


export * from './buyer-login.effect';
export * from './currentUser.effect';
export * from './selected-seller.effect';
export * from './order.effect';


import {BuyerLoginEffect} from './buyer-login.effect';
import {CurrentUserEffect} from './currentUser.effect';
import {UserEffect} from './user.effect';
import {OrderEffect} from './order.effect';

export const effects: any[] = [
  BuyerLoginEffect,
  CurrentUserEffect,
  UserEffect,
  OrderEffect
];


export * from './buyer-login.effect';
export * from './currentUser.effect';
export * from './user.effect';
export * from './order.effect';


import {LoginEffects} from './bakery-login.effect';
import {OrderEffects} from './order.effect';
import {CurrentUserEffects} from './currentUser.effect';

export const effects: any[] = [
  LoginEffects,
  OrderEffects,
  CurrentUserEffects,
];

export * from './bakery-login.effect';
export * from './order.effect';
export * from './currentUser.effect';


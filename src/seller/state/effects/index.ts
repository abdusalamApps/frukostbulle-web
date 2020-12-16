import {LoginEffects} from './login.effects';
import {ItemsEffects} from './items.effects';
import {CurrentUserEffects} from './currentUser.effects';
import {AreaEffects} from './area.effects';
import {BakeryEffects} from './bakery.effects';
import {OrderEffects} from './order.effects';
import {UserEffects} from './user.effects';

export const effects: any[] = [
  LoginEffects,
  ItemsEffects,
  CurrentUserEffects,
  AreaEffects,
  BakeryEffects,
  OrderEffects,
  UserEffects
];
export * from './login.effects';
export * from './items.effects';
export * from './currentUser.effects';
export * from './area.effects';
export * from './bakery.effects';
export * from './order.effects';
export * from './user.effects';

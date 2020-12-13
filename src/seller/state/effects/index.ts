import {LoginEffects} from './login.effects';
import {ItemsEffects} from './items.effects';
import {CurrentUserEffects} from './currentUser.effects';
import {AreaEffects} from './area.effects';

export const effects: any[] = [
  LoginEffects,
  ItemsEffects,
  CurrentUserEffects,
  AreaEffects
];
export * from './login.effects';
export * from './items.effects';
export * from './currentUser.effects';
export * from './area.effects';

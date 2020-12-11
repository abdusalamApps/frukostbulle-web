import {LoginEffects} from './login.effects';
import {ItemsEffects} from './items.effects';
import {CurrentUserEffects} from './currentUser.effects';

export const effects: any[] = [LoginEffects, ItemsEffects, CurrentUserEffects];
export * from './login.effects';
export * from './items.effects';
export * from './currentUser.effects';

import {AuthGuard} from './auth.guard';
import {DatesGuard} from './dates.guard';
import {OrdersGuard} from './orders.guard';
import {ItemsGuard} from './items.guard';
import {ProfileGuard} from './profile.guard';
import {AreaGuard} from './area.guard';
import {HistoryGuard} from './history.guard';

export const guards: any[] = [
  AuthGuard,
  DatesGuard,
  OrdersGuard,
  ItemsGuard,
  ProfileGuard,
  AreaGuard,
  HistoryGuard
];

export * from './auth.guard';
export * from './dates.guard';
export * from './orders.guard';
export * from './items.guard';
export * from './profile.guard';
export * from './area.guard';
export * from './history.guard';

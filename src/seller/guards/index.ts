import {AuthGuard} from './auth.guard';
import {DatesGuard} from './dates.guard';
import {OrdersGuard} from './orders.guard';
import {ItemsGuard} from './items.guard';

export const guards: any[] = [
  AuthGuard,
  DatesGuard,
  OrdersGuard,
  ItemsGuard
];

export * from './auth.guard';
export * from './dates.guard';
export * from './orders.guard';
export * from './items.guard';

import { AuthGuard } from './auth.guard';
import { DatesGuard } from './dates.guard';

export const guards: any[] = [AuthGuard, DatesGuard];

export * from './auth.guard';
export * from './dates.guard';

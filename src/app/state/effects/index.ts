import {RouterEffects} from './router.effects';
import {HydrationEffects} from './hydration.effects';

export const effects: any[] = [RouterEffects, HydrationEffects];

export * from './router.effects';
export * from './hydration.effects';

/**
 * Package state manages everything that has to do with the module's state
 * it has actions to request changes on the state,
 * reducers to actually change the state,
 * effects that get triggered when an action is dispatched
 * and selectors to get desired slices of the state
 * and can in their turn dispatch actions
 */

/**
 * actions are dispatched in a component or in an effect
 */
export * from './actions';

/**
 * the reducers are functions that actually changes the state
 */
export * from './reducers';

/**
 * selectors return slices of the state
 */
export * from './selectors';
/**
* effects are functions that get triggered when a component dispatch an action
 */
export * from './effects';

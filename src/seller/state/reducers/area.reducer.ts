import {Area} from '../../../models/area.model';
import * as areaActions from '../actions/area.action';

export interface AreaState {
  entities: { [userId: number]: Area }
  areasLoaded: boolean;
  areasLoading: boolean;
}

export const initialState: AreaState = {
  entities: {},
  areasLoaded: false,
  areasLoading: false,
};

export function reducer(
  state = initialState,
  action: areaActions.AreaAction
): AreaState {
  switch (action.type) {
    case areaActions.UPDATE_AREA_SUCCESS: {
      const area = action.payload;
      const entities = {
        ...state.entities,
        [area.sellerId]: area
      };
      return {
        ...state,
        entities
      };
    }
    default:
      return state;
  }
}

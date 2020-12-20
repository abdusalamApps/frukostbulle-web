import {createSelector} from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromBakery from '../reducers/bakery.reducer';
import {map} from 'rxjs/operators';
import {Bakery} from '../../../models/bakery.model';

export const getBakeryState = createSelector(
  fromFeature.getSellerState,
  (state: fromFeature.SellerState) => state.bakeries
);

export const getBakeryEntities = createSelector(
  getBakeryState,
  fromBakery.getBakeryEntities
);

export const getAllBakeries = createSelector(
  getBakeryEntities,
  (entities) => {
    return Object.keys(entities).map((bakeryId) => {
      return entities[parseInt(bakeryId, 10)];
    });
  });

export const getBakeriesByCounty = createSelector(
  getBakeryEntities,
  (entities: { [p: number]: Bakery } , props: any) => {
    const filtered = Object.keys(entities)
      .filter(id => entities[parseInt(id, 10)].county === props.county)
      .reduce((obj: { [p: number]: Bakery }, id) => {
        obj[parseInt(id, 10)] = entities[parseInt(id, 10)];
        return obj;
      }, {});
    return Object.keys(filtered).map((bakeryId) => {
      return filtered[parseInt(bakeryId, 10)];
    });
  });

export const getBakeriesByCity = createSelector(
  getBakeryEntities,
  (entities: { [p: number]: Bakery } , props: any) => {
    const filtered = Object.keys(entities)
      .filter(id => entities[parseInt(id, 10)].city === props.city)
      .reduce((obj: { [p: number]: Bakery }, id) => {
        obj[parseInt(id, 10)] = entities[parseInt(id, 10)];
        return obj;
      }, {});
    return Object.keys(filtered).map((bakeryId) => {
      return filtered[parseInt(bakeryId, 10)];
    });
  });

export const getBakeriesByName = createSelector(
  getBakeryEntities,
  (entities: { [p: number]: Bakery } , props: any) => {
    const filtered = Object.keys(entities)
      .filter(id => entities[parseInt(id, 10)].name.includes(props.name))
      .reduce((obj: { [p: number]: Bakery }, id) => {
        obj[parseInt(id, 10)] = entities[parseInt(id, 10)];
        return obj;
      }, {});
    return Object.keys(filtered).map((bakeryId) => {
      return filtered[parseInt(bakeryId, 10)];
    });
  });


export const getBakeriesLoaded = createSelector(
  getBakeryState,
  fromBakery.getBakeryLoaded
);

export const getBakeriesLoading = createSelector(
  getBakeryState,
  fromBakery.getBakeryLoading
);

export const getAssociatedBakery = createSelector(
  getBakeryState,
  fromBakery.getAssociatedBakery
);


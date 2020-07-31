import {createSelector} from 'reselect';
import {getActiveCity} from '../app/selectors.js';
import NameSpace from '../name-space.js';

export const getPlaces = (state) => {
  return state[NameSpace.DATA].places;
};

export const getPlacesByCity = createSelector(
    getPlaces,
    getActiveCity,
    (places, activeCity) => {
      return places.filter((place) => place.city.name === activeCity);
    }
);

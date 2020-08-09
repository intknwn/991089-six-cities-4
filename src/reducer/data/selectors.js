import {createSelector} from 'reselect';
import moment from 'moment';
import {getSortedByType} from '../../utils.js';
import {getActiveCity} from '../app/selectors.js';
import NameSpace from '../name-space.js';

export const getPlaces = (state) => {
  return state[NameSpace.DATA].places;
};

export const getNearby = (state) => {
  return state[NameSpace.DATA].placesNearby;
};

export const getCities = (state) => {
  return state[NameSpace.DATA].cities;
};

export const getPlacesByCity = createSelector(
    getPlaces,
    getActiveCity,
    (places, activeCity) => {
      return places.filter((place) => place.city.name === activeCity.name);
    }
);

export const getFavorites = (state) => {
  return state[NameSpace.DATA].favorites;
};

export const getReviews = (state) => {
  return state[NameSpace.DATA].reviews;
};

export const getSortedByDateReviews = createSelector(
    getReviews,
    (reviews) => reviews.sort((a, b) => {
      return moment(a).isAfter(moment(b)) ? 1 : -1;
    })
);

export const getSortType = (state) => {
  return state[NameSpace.DATA].sortType;
};

export const getPlacesBySortType = createSelector(
    getPlacesByCity,
    getSortType,
    (places, sortType) => {
      return getSortedByType(places, sortType);
    }
);

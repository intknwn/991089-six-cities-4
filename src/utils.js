import {SortType, ReviewsForm} from './const.js';

export const extend = (a, b) => Object.assign({}, a, b);

export const getPlacesByCity = (places, city) =>
  places.filter((place) => place.city === city);

export const getCitiesNames = (places) => Array.from(new Set(places.map((place) => place.city.name)));

export const getCities = (places) =>
  getCitiesNames(places).map((cityName) => places.find((place) => place.city.name === cityName).city);

export const updatePlaces = (places, newPlace) => {
  const index = places.findIndex((place) => place.id === newPlace.id);
  const newPlaces = places.slice();

  newPlaces.splice(index, 1, newPlace);

  return newPlaces;
};

export const getRatingWidth = (userRating) => {
  return {
    width: `${Math.round(userRating) * 100 / ReviewsForm.MAX_RATE}%`,
  };
};

export const getSortedByType = (places, sortType) => {
  const placesCopy = places.slice();

  switch (sortType) {
    case SortType.POPULAR:
      return placesCopy.sort((placeLeft, placeRight) => {
        return placeLeft.id - placeRight.id;
      });
    case SortType.LOW_HIGHT:
      return placesCopy.sort((placeLeft, placeRight) => {
        return placeLeft.price - placeRight.price;
      });
    case SortType.HIGHT_LOW:
      return placesCopy.sort((placeLeft, placeRight) => {
        return placeRight.price - placeLeft.price;
      });
    case SortType.TOP_RATED:
      return placesCopy.sort((placeLeft, placeRight) => {
        return placeRight.rating - placeLeft.rating;
      });
    default:
      return places;
  }
};

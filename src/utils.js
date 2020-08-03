export const extend = (a, b) => Object.assign({}, a, b);

export const getPlacesByCity = (places, city) =>
  places.filter((place) => place.city === city);

export const getCitiesNames = (places) => Array.from(new Set(places.map((place) => place.city.name)));

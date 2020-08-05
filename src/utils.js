export const extend = (a, b) => Object.assign({}, a, b);

export const getPlacesByCity = (places, city) =>
  places.filter((place) => place.city === city);

export const getCitiesNames = (places) => Array.from(new Set(places.map((place) => place.city.name)));

export const updatePlaces = (places, newPlace) => {
  const index = places.findIndex((place) => place.id === newPlace.id);
  const newPlaces = places.slice();

  newPlaces.splice(index, 1, newPlace);

  return newPlaces;
};

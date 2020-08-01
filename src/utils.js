export const extend = (a, b) => Object.assign({}, a, b);

export const getPlacesByCity = (places, city) =>
  places.filter((place) => place.city === city);

export const getCitiesNames = (places) =>
  places.reduce((acc, {city: {name}}) => {
    if (!acc.includes(name)) {
      return [...acc, name];
    }

    return acc;
  }, []);

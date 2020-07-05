export const extend = (a, b) => Object.assign({}, a, b);

export const getPlacesByCity = (places, city) =>
  places.filter((place) => place.city === city);

export const getCitiesNames = (cities) =>
  cities.reduce((acc, city) => {
    if (!acc.includes(city.name)) {
      return [...acc, city.name];
    }

    return acc;
  }, []);

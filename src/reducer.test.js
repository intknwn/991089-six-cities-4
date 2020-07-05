import {ActionType, ActionCreator, reducer} from './reducer.js';

const cities = [
  {
    name: `Paris`,
    coords: [48.8566, 2.3522],
    offers: [{
      picture: `img/apartment-01.jpg`,
      isPremium: true,
      rate: 120,
      title: `Charming & cozy studio`,
      type: `apartment`,
      rating: 3,
      isFavorite: false,
      location: [48.872127, 2.374092],
    },
    {
      picture: `img/apartment-01.jpg`,
      isPremium: true,
      rate: 120,
      title: `Appartement proche du belvédère de Paris`,
      type: `apartment`,
      rating: 3,
      isFavorite: false,
      location: [48.852738, 2.314865],
    }],
  },
  {
    name: `Cologne`,
    coords: [50.9375, 6.9603],
    offers: [{
      picture: `img/apartment-01.jpg`,
      isPremium: true,
      rate: 120,
      title: `Spacious modern aparment`,
      type: `apartment`,
      rating: 3,
      isFavorite: false,
      location: [50.940943, 6.956763],
    }],
  },
];


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    city: {
      name: `Paris`,
      coords: [48.8566, 2.3522],
      offers: [{
        picture: `img/apartment-01.jpg`,
        isPremium: true,
        rate: 120,
        title: `Charming & cozy studio`,
        type: `apartment`,
        rating: 3,
        isFavorite: false,
        location: [48.872127, 2.374092],
      },
      {
        picture: `img/apartment-01.jpg`,
        isPremium: true,
        rate: 120,
        title: `Appartement proche du belvédère de Paris`,
        type: `apartment`,
        rating: 3,
        isFavorite: false,
        location: [48.852738, 2.314865],
      }],
    }
  });
});

it(`Reducer should change city`, () => {
  expect(reducer({
    city: cities[0],
  }, {
    type: ActionType.SET_CITY,
    payload: cities[1],
  })).toEqual({
    city: cities[1],
  });
});

describe(`Action creator works correctly`, () => {
  it(`Action creator for changing city returns correct action`, () => {
    expect(ActionCreator.setCity(cities[1].name)).toEqual({
      type: ActionType.SET_CITY,
      payload: cities[1],
    });
  });
});


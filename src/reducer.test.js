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
  {
    name: `Brussels`,
    coords: [50.8503, 4.3517],
    offers: [{
      picture: `img/apartment-01.jpg`,
      isPremium: true,
      rate: 120,
      title: `Studio in Bruxelles à 15 m  du Centre`,
      type: `apartment`,
      rating: 3,
      isFavorite: false,
      location: [50.852671, 4.354286],
    },
    {
      picture: `img/apartment-01.jpg`,
      isPremium: true,
      rate: 120,
      title: `Ground Floor Appartement in Brussels city`,
      type: `apartment`,
      rating: 3,
      isFavorite: false,
      location: [50.852203, 4.345520],
    }],
  },
  {
    name: `Amsterdam`,
    coords: [52.3667, 4.8945],
    offers: [{
      picture: `img/apartment-01.jpg`,
      isPremium: true,
      rate: 120,
      title: `Beautiful & luxurious apartment at great location`,
      type: `apartment`,
      rating: 3,
      isFavorite: false,
      location: [52.3909553943508, 4.85309666406198],
    }, {
      picture: `img/apartment-02.jpg`,
      isPremium: true,
      rate: 200,
      title: `Wood and stone place`,
      type: `house`,
      rating: 5,
      isFavorite: true,
      location: [52.369553943508, 4.85309666406198],
    }, {
      picture: `img/apartment-03.jpg`,
      isPremium: false,
      rate: 90,
      title: `Canal View Prinsengracht`,
      type: `hotel`,
      rating: 4,
      isFavorite: false,
      location: [52.3909553943508, 4.929309666406198],
    }, {
      picture: `img/apartment-02.jpg`,
      isPremium: false,
      rate: 110,
      title: `Nice, cozy, warm big bed apartment`,
      type: `apartment`,
      rating: 4,
      isFavorite: true,
      location: [52.3809553943508, 4.939309666406198],
    }, {
      picture: `img/apartment-02.jpg`,
      isPremium: false,
      rate: 110,
      title: `Cozy place`,
      type: `apartment`,
      rating: 4,
      isFavorite: true,
      location: [52.3909553943508, 4.939309666406198],
    }],
  },
  {
    name: `Hamburg`,
    coords: [53.5511, 9.9937],
    offers: [{
      picture: `img/apartment-01.jpg`,
      isPremium: true,
      rate: 120,
      title: `Cosy, bright room in green neighborhood`,
      type: `apartment`,
      rating: 3,
      isFavorite: false,
      location: [53.553344, 9.990052],
    },
    {
      picture: `img/apartment-01.jpg`,
      isPremium: true,
      rate: 120,
      title: `Exklusives Penthouse in Hamburg/Dachterrasse`,
      type: `apartment`,
      rating: 3,
      isFavorite: false,
      location: [53.552279, 9.998013],
    }]
  },
  {
    name: `Dusseldorf`,
    coords: [51.2277, 6.7735],
    offers: [{
      picture: `img/apartment-01.jpg`,
      isPremium: true,
      rate: 120,
      title: `Modern & Stylish Hideout | Close to Everything`,
      type: `apartment`,
      rating: 3,
      isFavorite: false,
      location: [51.225704, 6.780238],
    },
    {
      picture: `img/apartment-01.jpg`,
      isPremium: true,
      rate: 120,
      title: `Gemütliches Apartment im Herzen von Pempelfort`,
      type: `apartment`,
      rating: 3,
      isFavorite: false,
      location: [51.233597, 6.784310],
    }]
  }
];


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    cities,
    activeCity: cities[0].name,
  });
});

it(`Reducer should change active city`, () => {
  expect(reducer({
    cities,
    activeCity: cities[0].name,
  }, {
    type: ActionType.SET_CITY,
    payload: cities[1].name,
  })).toEqual({
    cities,
    activeCity: cities[1].name,
  });
});

describe(`Action creator works correctly`, () => {
  it(`Action creator for changing city returns correct action`, () => {
    expect(ActionCreator.setCity(cities[1].name)).toEqual({
      type: ActionType.SET_CITY,
      payload: cities[1].name,
    });
  });
});

import {citiesNames} from '../../const.js';
import {ActionType, ActionCreator, reducer} from './app.js';

const place = {
  "bedrooms": 3,
  "city": {
    "location": {
      "latitude": 50.846557,
      "longitude": 4.351697,
      "zoom": 13
    },
    "name": `Brussels`,
  },
  "description": `Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country.`,
  "goods": [`Wahser`, `Fridge`, `Towels`, `Breakfast`, `Baby seat`, `Dishwasher`, `Laptop friendly workspace`, `Air conditioning`],
  "host": {
    "avatar_url": `img/avatar-angelina.jpg`,
    "id": 25,
    "is_pro": true,
    "name": `Angelina`
  },
  "id": 1,
  "images": [
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg`,
  ],
  "is_favorite": false,
  "is_premium": false,
  "location": {
    "latitude": 50.842557,
    "longitude": 4.3536969999999995,
    "zoom": 16
  },
  "max_adults": 1,
  "preview_image": `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg`,
  "price": 227,
  "rating": 2.2,
  "title": `Nice, cozy, warm big bed apartment`,
  "type": `room`
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    activeCity: {
      name: ``,
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0,
      }
    },
    activePlace: null,
    error: null,
    isLoading: false,
  });
});

it(`Reducer should change active city`, () => {
  expect(reducer({
    activeCity: citiesNames[0],
  }, {
    type: ActionType.SET_CITY,
    payload: citiesNames[1],
  })).toEqual({
    activeCity: citiesNames[1],
  });
});

it(`Reducer should change error message`, () => {
  expect(reducer({
    error: null,
  }, {
    type: ActionType.CATCH_ERROR,
    payload: `some error`,
  })).toEqual({
    error: `some error`,
  });
});

it(`Reducer should change active place`, () => {
  expect(reducer({
    activePlace: null,
  }, {
    type: ActionType.SET_ACTIVE_PLACE,
    payload: place,
  })).toEqual({
    activePlace: place,
  });
});

it(`Reducer should change loading status`, () => {
  expect(reducer({
    isLoading: true,
  }, {
    type: ActionType.SET_LOADING_STATUS,
    payload: false,
  })).toEqual({
    isLoading: false,
  });
});

describe(`Action creator works correctly`, () => {
  it(`Action creator for changing city returns correct action`, () => {
    expect(ActionCreator.setCity(citiesNames[1])).toEqual({
      type: ActionType.SET_CITY,
      payload: citiesNames[1],
    });
  });

  it(`Action creator for catching errors returns correct action`, () => {
    expect(ActionCreator.catchError(`some error`)).toEqual({
      type: ActionType.CATCH_ERROR,
      payload: `some error`,
    });
  });

  it(`Action creator for changing active place returns correct action`, () => {
    expect(ActionCreator.setActivePlace(place)).toEqual({
      type: ActionType.SET_ACTIVE_PLACE,
      payload: place,
    });
  });

  it(`Action creator for changing loading status returns correct action`, () => {
    expect(ActionCreator.setLoadingStatus(true)).toEqual({
      type: ActionType.SET_LOADING_STATUS,
      payload: true,
    });
  });
});

import MockAdapter from "axios-mock-adapter";
import {getCitiesNames} from "../../utils.js";
import {ActionType, Operation, reducer} from './data.js';
import {ActionType as AppActionType} from '../app/app.js';
import {createAPI} from "../../api.js";


const api = createAPI(() => {});

const places = [{
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
},
{
  "bedrooms": 2,
  "city": {
    "location": {
      "latitude": 50.846557,
      "longitude": 4.351697,
      "zoom": 13
    },
    "name": `Brussels`,
  },
  "description": `I am happy to welcome you to my apartment in the city center! Three words: location, cosy and chic!`,
  "goods": [`Wahser`, `Fridge`, `Towels`, `Breakfast`, `Laptop friendly workspace`, `Air conditioning`],
  "host": {
    "avatar_url": `img/avatar-angelina.jpg`,
    "id": 25,
    "is_pro": true,
    "name": `Angelina`
  },
  "id": 2,
  "images": [
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/13.jpg`,
  ],
  "is_favorite": false,
  "is_premium": false,
  "location": {
    "latitude": 50.867557,
    "longitude": 4.357697,
    "zoom": 16
  },
  "max_adults": 3,
  "preview_image": `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg`,
  "price": 327,
  "rating": 3.2,
  "title": `The house among olive`,
  "type": `house`
}];


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    places: [],
    cities: [],
    favorites: [],
  });
});

it(`Reducer should update state on places load`, () => {
  expect(reducer({
    places: [],
  }, {
    type: ActionType.LOAD_PLACES,
    payload: places,
  })).toEqual({
    places,
  });
});

it(`Reducer should update cities on places load`, () => {
  const cities = getCitiesNames(places);

  expect(reducer({
    cities: [],
  }, {
    type: ActionType.SET_CITIES,
    payload: cities,
  })).toEqual({
    cities,
  });
});

it(`Reducer should update places on add to favorites`, () => {
  expect(reducer({
    places: [{"id": 1, "is_favorite": true}, {"id": 2, "is_favorite": false}, {"id": 2, "is_favorite": true}],
  }, {
    type: ActionType.UPDATE_PLACE,
    payload: {"id": 2, "is_favorite": true},
  })).toEqual({
    places: [{"id": 1, "is_favorite": true}, {"id": 2, "is_favorite": true}, {"id": 2, "is_favorite": true}],
  });
});

it(`Reducer should update state on favorites load`, () => {
  expect(reducer({
    favorites: [],
  }, {
    type: ActionType.GET_FAVORITES,
    payload: places,
  })).toEqual({
    favorites: places,
  });
});

describe(`Operation works correctly`, () => {
  it(`Should make a correct API call to /hotels`, () => {
    const cities = getCitiesNames(places);
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const placesLoader = Operation.loadPlaces();

    apiMock
      .onGet(`/hotels`)
      .reply(200, places);

    return placesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PLACES,
          payload: places,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_CITIES,
          payload: cities,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: AppActionType.SET_CITY,
          payload: cities[0],
        });
      });
  });

  it(`Should make a correct API call to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteSetter = Operation.setFavorite(1, true);

    apiMock
      .onPost(`/favorite/1/0`)
      .reply(200, {"id": 1, "is_favorite": false});

    return favoriteSetter(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_PLACE,
          payload: {"id": 1, "is_favorite": false},
        });
      });
  });
})
;

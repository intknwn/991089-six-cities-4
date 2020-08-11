import MockAdapter from 'axios-mock-adapter';
import {SortType} from '../../const.js';
import {ActionType, ActionCreator, Operation, reducer} from './data.js';
import {ActionType as AppActionType} from '../app/app.js';
import {createAPI} from '../../api.js';
import {getCities} from '../../utils.js';


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

const reviews = [{
  "id": 21,
  "user": {
    "id": 18,
    "is_pro": true,
    "name": `Sophie`,
    "avatar_url": `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/9.jpg`
  },
  "rating": 3,
  "comment": `Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.`,
  "date": `2020-07-17T16:06:01.820Z`
}, {
  "id": 2,
  "user": {
    "id": 19,
    "is_pro": false,
    "name": `Christina`,
    "avatar_url": `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/10.jpg`
  },
  "rating": 4,
  "comment": `Home is amazing. It's like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius`,
  "date": `2020-07-17T16:06:01.820Z`
}];

const cities = [{
  name: `Amsterdam`,
  location: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13
  }
},
{
  name: `Hamburg`,
  location: {
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 13
  }
},
{
  name: `Paris`,
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  }
},
{
  name: `Dusseldorf`,
  location: {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 13
  }
},
{
  name: `Brussels`,
  location: {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 13
  }
},
{
  name: `Cologne`,
  location: {
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 13
  }
}];


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    places: [],
    cities: [],
    favorites: [],
    reviews: [],
    placesNearby: [],
    sortType: SortType.POPULAR,
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

it(`Reducer should update state on reviews load`, () => {
  expect(reducer({
    reviews: [],
  }, {
    type: ActionType.GET_REVIEWS,
    payload: reviews,
  })).toEqual({
    reviews,
  });
});

it(`Reducer should update state on nearby places load`, () => {
  expect(reducer({
    placesNearby: [],
  }, {
    type: ActionType.GET_PLACES_NEARBY,
    payload: places,
  })).toEqual({
    placesNearby: places,
  });
});

it(`Reducer should update state on sort type change`, () => {
  expect(reducer({
    sortType: SortType.POPULAR,
  }, {
    type: ActionType.SET_SORT_TYPE,
    payload: SortType.TOP_RATED,
  })).toEqual({
    sortType: SortType.TOP_RATED,
  });
});

describe(`Action creator works correctly`, () => {
  it(`Action creator for loading places returns correct action`, () => {
    expect(ActionCreator.loadPlaces(places)).toEqual({
      type: ActionType.LOAD_PLACES,
      payload: places,
    });
  });

  it(`Action creator for setting city returns correct action`, () => {
    expect(ActionCreator.setCities(cities)).toEqual({
      type: ActionType.SET_CITIES,
      payload: cities,
    });
  });

  it(`Action creator for updating place returns correct action`, () => {
    expect(ActionCreator.updatePlace(places[0])).toEqual({
      type: ActionType.UPDATE_PLACE,
      payload: places[0],
    });
  });

  it(`Action creator for getting favorites returns correct action`, () => {
    expect(ActionCreator.getFavorites(places)).toEqual({
      type: ActionType.GET_FAVORITES,
      payload: places,
    });
  });

  it(`Action creator for getting reviews returns correct action`, () => {
    expect(ActionCreator.getReviews(reviews)).toEqual({
      type: ActionType.GET_REVIEWS,
      payload: reviews,
    });
  });

  it(`Action creator for getting reviews returns correct action`, () => {
    expect(ActionCreator.getReviews(reviews)).toEqual({
      type: ActionType.GET_REVIEWS,
      payload: reviews,
    });
  });

  it(`Action creator for getting places nearby returns correct action`, () => {
    expect(ActionCreator.getPlacesNearby(places)).toEqual({
      type: ActionType.GET_PLACES_NEARBY,
      payload: places,
    });
  });

  it(`Action creator for setting sort type returns correct action`, () => {
    expect(ActionCreator.setSortType(SortType.POPULAR)).toEqual({
      type: ActionType.SET_SORT_TYPE,
      payload: SortType.POPULAR,
    });
  });
});

describe(`Operation works correctly`, () => {
  const getState = jest.fn();
  const id = 21;

  it(`Should make a correct API call to /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const placesLoader = Operation.loadPlaces();
    const mockCities = getCities(places);

    apiMock
      .onGet(`/hotels`)
      .reply(200, places);

    return placesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: AppActionType.SET_CITY,
          payload: places[0].city,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_PLACES,
          payload: places,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_CITIES,
          payload: mockCities,
        });
      });
  });

  it(`Should make a correct API call to comments/id`, function () {
    const dispatch = jest.fn();
    const reviewsLoader = Operation.getReviews(id);
    const apiMock = new MockAdapter(api);

    apiMock
      .onGet(`/comments/${id}`)
      .reply(200, reviews);

    return reviewsLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_REVIEWS,
          payload: reviews,
        });
      });
  });

  it(`Should make a correct API call hotels/id/nearby`, function () {
    const nearbyPlacesLoader = Operation.getPlacesNearby(id);
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onGet(`/hotels/${id}/nearby`)
      .reply(200, places);

    return nearbyPlacesLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_PLACES_NEARBY,
          payload: places,
        });
      });
  });

  it(`Should make a correct POST request to comments/id`, function () {
    const postReviewLoader = Operation.postReview(reviews[0], () => {});
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onPost(`/comments/${id}`)
      .reply(200, reviews);

    return postReviewLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: AppActionType.SET_LOADING_STATUS,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.GET_REVIEWS,
          payload: reviews,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: AppActionType.SET_LOADING_STATUS,
          payload: false,
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
});

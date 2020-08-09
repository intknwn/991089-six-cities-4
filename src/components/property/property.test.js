import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from "react-router-dom";
import {Property} from './property.jsx';
import NameSpace from '../../reducer/name-space.js';
import history from '../../history.js';

const mockStore = configureStore([]);

const user = {
  "avatar_url": `img/1.png`,
  "email": `Oliver.conner@gmail.com`,
  "id": 1,
  "is_pro": false,
  "name": `Oliver.conner`,
};

const activeCity = {
  name: `Brussels`,
  location: {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 13
  }
};

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
  "id": 3,
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
}, {
  "id": 1,
  "user": {
    "id": 15,
    "is_pro": false,
    "name": `Kendall`,
    "avatar_url": `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/6.jpg`
  },
  "rating": 4,
  "comment": `The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.`,
  "date": `2020-07-17T16:06:01.820Z`
}];

it(`Property render`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      places,
      placesNearby: places,
      reviews,
    },
    [NameSpace.APP]: {
      isLoading: false,
      activeCity
    },
    [NameSpace.USER]: {
      user
    },
  });

  const match = {
    params: {
      id: `1`,
    }
  };

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <Property
              places={places}
              reviews={reviews}
              placesNearby={places}
              onAddToFavoritesButtonClick={() => {}}
              getPlaceReviews={() => {}}
              getPlacesNearby={() => {}}
              postReview={() => {}}
              isLoading={false}
              match={match}
            />
          </Router>
        </Provider>,
        {
          createNodeMock: () => document.createElement(`div`)
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

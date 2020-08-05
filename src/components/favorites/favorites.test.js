import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from "react-router-dom";
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Favorites} from './favorites.jsx';
import history from '../../history.js';
import NameSpace from '../../reducer/name-space.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';

const mockStore = configureStore([]);

const cities = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
const activeCity = `Brussels`;

const user = {
  "avatar_url": `img/1.png`,
  "email": `Oliver.conner@gmail.com`,
  "id": 1,
  "is_pro": false,
  "name": `Oliver.conner`,
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
  "is_favorite": true,
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
  "is_favorite": true,
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

it(`Header render`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      places,
      cities,
    },
    [NameSpace.APP]: {
      activeCity,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      user
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <Favorites
              user={user}
              places={places}
            />
          </Router>
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

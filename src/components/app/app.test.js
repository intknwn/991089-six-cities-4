import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {Screen} from '../../const.js';

const mockStore = configureStore([]);

const cities = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
const activeCity = `Brussels`;
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

it(`render App`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      places,
      cities,
    },
    [NameSpace.APP]: {
      activeCity,
      screen: Screen.SIGN_IN,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App />
        </Provider>,
        {
          createNodeMock: () => document.createElement(`section`)
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

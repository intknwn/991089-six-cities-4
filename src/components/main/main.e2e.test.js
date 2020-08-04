import React from "react";
import Adapter from "enzyme-adapter-react-16";
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {configure, mount} from "enzyme";
import {Router} from "react-router-dom";
import {Main} from "./main.jsx";
import NameSpace from '../../reducer/name-space.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import history from '../../history.js';

const mockStore = configureStore([]);

configure({
  adapter: new Adapter(),
});

const user = {
  "avatar_url": `img/1.png`,
  "email": `Oliver.conner@gmail.com`,
  "id": 1,
  "is_pro": false,
  "name": `Oliver.conner`,
};
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

it(`Card title click`, () => {
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
    },
  });

  const onCardTitleClick = jest.fn();

  const main = mount(
      <Provider store={store}>
        <Router history={history}>
          <Main
            places={places}
            cities={cities}
            user={user}
            activeCity={activeCity}
            renderSignInScreen={() => {}}
            onCardTitleClick={onCardTitleClick}
            onCityTabClick={() => {}}
          />
        </Router>
      </Provider>
  );

  const cardTitles = main.find(`.place-card__name a`);

  cardTitles.forEach((title) => {
    title.simulate(`click`);
  });

  expect(onCardTitleClick.mock.calls.length).toBe(places.length);
});

import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from "react-router-dom";
import {PlaceCard} from './place-card.jsx';
import {PlaceCardType} from '../../const.js';
import history from '../../history.js';

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

it(`PlaceCard render`, () => {
  const tree = renderer.create(
      <Router history={history}>
        <PlaceCard
          place={place}
          type={PlaceCardType.PLACE}
          onActiveItemSet={() => {}}
          onPlaceCardHover={() => {}}
          onCardTitleClick={() => {}}
          updatePlacesNearby={() => {}}
          onAddToFavoritesButtonClick={() => {}}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

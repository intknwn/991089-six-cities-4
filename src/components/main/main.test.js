import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';
import {Settings} from '../../const.js';

const offers = [{
  picture: `https://via.placeholder.com/260x200?text=Place+1`,
  isPremium: false,
  rate: 230,
  title: `Comfortable Double Room near Amsterdam Center`,
  type: `room`,
  rating: 1,
  isFavorite: false,
}, {
  picture: `https://via.placeholder.com/260x200?text=Place+2`,
  isPremium: true,
  rate: 150,
  title: `Spacious and stylish downtown suite`,
  type: `house`,
  rating: 5,
  isFavorite: true,
}, {
  picture: `https://via.placeholder.com/260x200?text=Place+3`,
  isPremium: false,
  rate: 110,
  title: `Studio 13`,
  type: `hotel`,
  rating: 2,
  isFavorite: true,
}, {
  picture: `https://via.placeholder.com/260x200?text=Place+4`,
  isPremium: false,
  rate: 240,
  title: `Cozy room in lively apartment and neighbourhood`,
  type: `apartment`,
  rating: 3,
  isFavorite: false,
}
];

it(`render Main`, () => {
  const tree = renderer
    .create(<Main
      places={offers}
      placesCount={Settings.PLACES}
      onCardTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

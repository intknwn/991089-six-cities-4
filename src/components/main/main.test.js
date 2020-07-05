import React from 'react';
import renderer from 'react-test-renderer';
import {Main} from './main.jsx';

const city = {
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
};

it(`render Main`, () => {
  const tree = renderer
    .create(<Main
      city={city}
      onCardTitleClick={() => {}}
      onCityTabClick={() => {}}
    />,
    {
      createNodeMock: () => document.createElement(`section`)
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

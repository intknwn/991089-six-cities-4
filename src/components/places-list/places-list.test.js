import React from 'react';
import renderer from 'react-test-renderer';
import PlacesList from './places-list.jsx';
import {Offers} from '../../mocks/offers.js';

it(`PlaceCard render`, () => {
  const tree = renderer.create(
      <PlacesList
        places={Offers}
        onCardTitleClick={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

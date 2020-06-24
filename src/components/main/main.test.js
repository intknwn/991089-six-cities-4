import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';
import {Settings} from '../../const.js';
import {Offers} from '../../mocks/offers.js';

it(`render Main`, () => {
  const tree = renderer
    .create(<Main
      places={Offers}
      placesCount={Settings.PLACES}
      onCardTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

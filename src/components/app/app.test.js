import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';
import {Settings} from '../../const.js';
import {Offers} from '../../mocks/offers.js';

it(`render App`, () => {
  const tree = renderer
    .create(<App
      places={Offers}
      placesCount={Settings.PLACES}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

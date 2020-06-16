import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';
import {PROPERTY_NAMES, Settings} from '../../const.js';

it(`render App`, () => {
  const tree = renderer
    .create(<App
      propertyNames={PROPERTY_NAMES}
      placesCount={Settings.PLACES}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

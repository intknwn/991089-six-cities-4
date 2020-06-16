import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';
import {PROPERTY_NAMES, Settings} from '../../const.js';

it(`render Main`, () => {
  const tree = renderer
    .create(<Main
      propertyNames={PROPERTY_NAMES}
      placesCount={Settings.PLACES}
      onCardTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

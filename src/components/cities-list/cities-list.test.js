import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list.jsx';

const city = `Paris`;
const cities = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];

it(`CitiesList render`, () => {
  const tree = renderer
    .create(<CitiesList
      cities={cities}
      activeCity={city}
      onActiveItemSet={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import NoPlaces from './no-places.jsx';

const cityName = `Paris`;

it(`NoPlaces render`, () => {
  const tree = renderer.create(
      <NoPlaces
        activeCity={cityName}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

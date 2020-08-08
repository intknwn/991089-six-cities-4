import React from 'react';
import renderer from 'react-test-renderer';
import NoPlaces from './no-places.jsx';

const city = {
  "location": {
    "latitude": 50.846557,
    "longitude": 4.351697,
    "zoom": 13
  },
  "name": `Brussels`,
};

it(`NoPlaces render`, () => {
  const tree = renderer.create(
      <NoPlaces
        activeCity={city}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

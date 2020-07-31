import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list.jsx';

const city = `Paris`;

it(`CitiesList render`, () => {
  const tree = renderer
    .create(<CitiesList
      activeCity={city}
      onActiveItemSet={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

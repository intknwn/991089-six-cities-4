import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map.jsx';

it(`render Map`, () => {
  const tree = renderer.create(
      <Map
        places={[]}
      />,
      {
        createNodeMock: () => document.createElement(`section`)
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

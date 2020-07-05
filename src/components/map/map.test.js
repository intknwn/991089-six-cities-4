import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map.jsx';

const coords = [48.8566, 2.3522];

it(`render Map`, () => {
  const tree = renderer.create(
      <Map
        cityCoords={coords}
        places={[]}
      />,
      {
        createNodeMock: () => document.createElement(`section`)
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

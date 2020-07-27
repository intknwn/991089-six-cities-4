import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from './place-card.jsx';

const mock = {
  picture: `https://via.placeholder.com/260x200?text=Place+1`,
  isPremium: false,
  rate: 230,
  title: `Comfortable Double Room near Amsterdam Center`,
  type: `room`,
  rating: 1,
  isFavorite: false,
};

it(`PlaceCard render`, () => {
  const tree = renderer.create(
      <PlaceCard
        placeDetails={mock}
        onActiveItemSet={() => {}}
        onCardTitleClick={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

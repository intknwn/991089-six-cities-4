import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from './place-card.jsx';

const mock = {
  picture: `img/apartment-01.jpg`,
  isPremium: true,
  rate: 120,
  title: `Beautiful & luxurious apartment at great location`,
  type: `apartment`,
  rating: 3,
  isFavorite: false,
};

it(`PlaceCard render`, () => {
  const tree = renderer.create(
      <PlaceCard
        placeDetails={mock}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        onCardTitleClick={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

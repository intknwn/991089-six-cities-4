import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlaceCard from '../place-card/place-card.jsx';

configure({
  adapter: new Adapter(),
});

const mock = {
  picture: `img/apartment-01.jpg`,
  isPremium: true,
  rate: 120,
  title: `Beautiful & luxurious apartment at great location`,
  type: `apartment`,
  rating: 3,
  isFavorite: false,
};

it(`Callback contains card element`, () => {
  const onMouseEnter = jest.fn();

  const placeCard = shallow(
      <PlaceCard
        placeDetails={mock}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => {}}
        onCardTitleClick={() => {}}
      />
  );

  placeCard.simulate(`mouseEnter`);

  expect(onMouseEnter).toHaveBeenCalledTimes(1);

  expect(onMouseEnter.mock.calls[0][0]).toMatchObject(mock);
});

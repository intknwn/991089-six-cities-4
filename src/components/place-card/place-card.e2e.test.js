import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlaceCard from '../place-card/place-card.jsx';

configure({
  adapter: new Adapter(),
});

const mock = {
  picture: `https://via.placeholder.com/260x200?text=Place+1`,
  isPremium: false,
  rate: 230,
  title: `Comfortable Double Room near Amsterdam Center`,
  type: `room`,
  rating: 1,
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

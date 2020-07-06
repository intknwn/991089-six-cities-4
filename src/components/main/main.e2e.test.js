import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Main} from "./main.jsx";

configure({
  adapter: new Adapter(),
});

const city = {
  name: `Paris`,
  coords: [48.8566, 2.3522],
  offers: [{
    picture: `img/apartment-01.jpg`,
    isPremium: true,
    rate: 120,
    title: `Charming & cozy studio`,
    type: `apartment`,
    rating: 3,
    isFavorite: false,
    location: [48.872127, 2.374092],
  },
  {
    picture: `img/apartment-01.jpg`,
    isPremium: true,
    rate: 120,
    title: `Appartement proche du belvédère de Paris`,
    type: `apartment`,
    rating: 3,
    isFavorite: false,
    location: [48.852738, 2.314865],
  }],
};

it(`Card title click`, () => {
  const onCardTitleClick = jest.fn();

  const main = mount(
      <Main
        city={city}
        onCardTitleClick={onCardTitleClick}
        onCityTabClick={() => {}}
      />
  );

  const cardTitles = main.find(`.place-card__name a`);

  cardTitles.forEach((title) => {
    title.simulate(`click`);
  });

  expect(onCardTitleClick.mock.calls.length).toBe(city.offers.length);
});

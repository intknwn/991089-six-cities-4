import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";
import {Settings} from '../../const.js';
import {Offers} from '../../mocks/offers.js';

configure({
  adapter: new Adapter(),
});

it(`Card title click`, () => {
  const onCardTitleClick = jest.fn();

  const main = mount(
      <Main
        places={Offers}
        placesCount={Settings.PLACES}
        onCardTitleClick={onCardTitleClick}
      />
  );

  const cardTitles = main.find(`.place-card__name a`);

  cardTitles.forEach((title) => {
    title.simulate(`click`);
  });

  expect(onCardTitleClick.mock.calls.length).toBe(Offers.length);
});

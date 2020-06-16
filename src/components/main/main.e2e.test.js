import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";
import {PROPERTY_NAMES, Settings} from '../../const.js';

configure({
  adapter: new Adapter(),
});

it(`Card title click`, () => {
  const onCardTitleClick = jest.fn();

  const main = shallow(
      <Main
        propertyNames={PROPERTY_NAMES}
        placesCount={Settings.PLACES}
        onCardTitleClick={onCardTitleClick}
      />
  );

  const cardTitles = main.find(`.place-card__name a`);

  cardTitles.forEach((title) => {
    title.simulate(`click`);
  });

  expect(onCardTitleClick.mock.calls.length).toBe(PROPERTY_NAMES.length);
});

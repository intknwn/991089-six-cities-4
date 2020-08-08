import React from 'react';
import renderer from 'react-test-renderer';
import ReviewsList from './reviews-list.jsx';

const reviews = [{
  "id": 3,
  "user": {
    "id": 18,
    "is_pro": true,
    "name": `Sophie`,
    "avatar_url": `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/9.jpg`
  },
  "rating": 3,
  "comment": `Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.`,
  "date": `2020-07-17T16:06:01.820Z`
}, {
  "id": 2,
  "user": {
    "id": 19,
    "is_pro": false,
    "name": `Christina`,
    "avatar_url": `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/10.jpg`
  },
  "rating": 4,
  "comment": `Home is amazing. It's like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius`,
  "date": `2020-07-17T16:06:01.820Z`
}, {
  "id": 1,
  "user": {
    "id": 15,
    "is_pro": false,
    "name": `Kendall`,
    "avatar_url": `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/6.jpg`
  },
  "rating": 4,
  "comment": `The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.`,
  "date": `2020-07-17T16:06:01.820Z`
}];

it(`ReviewsList render`, () => {

  const tree = renderer.create(
      <ReviewsList
        reviews={reviews}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});

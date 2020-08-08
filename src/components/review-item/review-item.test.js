import React from 'react';
import renderer from 'react-test-renderer';
import ReviewItem from './review-item.jsx';

const review = {
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
};

it(`ReviewItem render`, () => {

  const tree = renderer.create(
      <ReviewItem
        review={review}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});


import React from 'react';
import renderer from 'react-test-renderer';
import ReviewForm from '../../components/review-form/review-form.jsx';
import withReviewForm from './with-review-form.jsx';

const ReviewFormWrapped = withReviewForm(ReviewForm);

it(`withReviewForm render`, () => {
  const tree = renderer.create((
    <ReviewFormWrapped
      id={1}
      postReview={() => {}}
      isLoading={false}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});

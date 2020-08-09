import React from 'react';
import renderer from 'react-test-renderer';
import ReviewForm from './review-form';


it(`ReviewForm render`, () => {

  const tree = renderer.create(
      <ReviewForm
        isDisabled={true}
        isLoading={false}
        comment={`Value for the money!`}
        rating={0}
        onRatingChange={() => {}}
        onFormSubmit={() => {}}
        onCommentChange={() => {}}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});

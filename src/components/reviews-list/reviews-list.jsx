import React from 'react';
import PropTypes from 'prop-types';
import ReviewItem from '../review-item/review-item.jsx';
import {reviewPropTypes, Review} from '../../const.js';

const ReviewsList = ({reviews}) => {
  return (
    <ul className="reviews__list">
      {reviews.slice(0, Review.MAX_PER_PAGE).map((review) => {
        return <ReviewItem key={review.id} review={review}/>;
      })}
    </ul>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewPropTypes),
};

export default ReviewsList;

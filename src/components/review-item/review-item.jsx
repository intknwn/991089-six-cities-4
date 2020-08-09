import React from 'react';
import {reviewPropTypes} from '../../const.js';
import {getRatingWidth} from '../../utils.js';
import moment from 'moment';

const ReviewItem = ({review}) => {
  const {
    comment,
    date,
    rating,
    user
  } = review;

  const reviewDate = moment(date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatar_url}
            width={54}
            height={54}
            alt={user.name}
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={getRatingWidth(rating)} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>
          {reviewDate.format(`MMMM YYYY`)}
        </time>
      </div>
    </li>
  );
};

ReviewItem.propTypes = {
  review: reviewPropTypes,
};

export default ReviewItem;

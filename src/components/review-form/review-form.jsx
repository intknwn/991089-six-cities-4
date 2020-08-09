import React from 'react';
import PropTypes from 'prop-types';
import {reviewPropTypes, ReviewsForm} from '../../const.js';

const ReviewForm = ({
  comment,
  rating,
  onRatingChange,
  onCommentChange,
  isDisabled,
  isLoading,
  onFormSubmit
}) => {

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {new Array(ReviewsForm.MAX_RATE).fill(``).map((_, index) => {
          const id = index + 1;

          return (
            <React.Fragment key={id}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                defaultValue={id}
                id={`${id}-stars`}
                type="radio"
                checked={id === rating}
                disabled={isLoading}
                onChange={onRatingChange}
              />
              <label htmlFor={`${id}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </React.Fragment>
          );
        }).reverse()}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        min={ReviewsForm.MIN_COMMENT_LENGTH}
        max={ReviewsForm.MAX_COMMENT_LENGTH}
        disabled={isLoading}
        onChange={onCommentChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isLoading || isDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  review: reviewPropTypes,
  comment: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
};

export default ReviewForm;

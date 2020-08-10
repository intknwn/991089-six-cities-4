import React from 'react';
import PropTypes from 'prop-types';
import {ReviewsForm} from '../../const.js';

const withReviewForm = (Component) => {

  class WithReviewForm extends React.PureComponent {
    constructor(props) {
      super(props);

      const {id} = this.props;

      this.state = {
        id,
        comment: ``,
        rating: 0,
        isDisabled: true,
      };

      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleCommentChange = this._handleCommentChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.comment !== this.state.comment || prevState.rating !== this.state.rating) {
        this.setState((state) => ({
          isDisabled: state.comment.length < ReviewsForm.MIN_COMMENT_LENGTH || state.rating === 0,
        }));
      }
    }

    _handleFormSubmit(evt) {
      evt.preventDefault();

      const {postReview} = this.props;
      const {comment, rating, id} = this.state;

      postReview({comment, rating, id});
      this.setState({
        comment: ``,
        rating: 0,
      });
    }

    _handleRatingChange(evt) {
      this.setState({
        rating: Number(evt.target.value),
      });
    }

    _handleCommentChange(evt) {
      this.setState({
        comment: evt.target.value,
      });
    }

    render() {
      const {isDisabled, comment, rating} = this.state;
      const {isLoading} = this.props;

      return (
        <Component
          {...this.props}
          comment={comment}
          rating={rating}
          isDisabled={isDisabled}
          isLoading={isLoading}
          onFormSubmit={this._handleFormSubmit}
          onRatingChange={this._handleRatingChange}
          onCommentChange={this._handleCommentChange}
        />
      );
    }
  }

  WithReviewForm.propTypes = {
    id: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    postReview: PropTypes.func.isRequired,
  };

  return WithReviewForm;
};

export default withReviewForm;

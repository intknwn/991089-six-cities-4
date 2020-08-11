import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withReviewForm from '../../hocs/with-review-form/with-review-form.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import Header from '../header/header.jsx';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import Map from '../map/map.jsx';
import PlacesList from '../places-list/places-list.jsx';
import history from '../../history.js';
import {getRatingWidth} from '../../utils.js';
import {getLoadingStatus} from '../../reducer/app/selectors.js';
import {getPlaces, getNearby, getSortedByDateReviews} from '../../reducer/data/selectors.js';
import {getUser} from '../../reducer/user/selectors.js';
import {Operation} from '../../reducer/data/data.js';
import {
  placePropTypes,
  userPropTypes,
  reviewPropTypes,
  Place,
  PlaceCardType,
  AppRoute,
  bookmarkIconStyle
} from '../../const.js';

const ReviewFormWrapped = withReviewForm(ReviewForm);

class Property extends React.PureComponent {
  constructor(props) {
    super(props);
    this._place = null;
  }

  componentDidMount() {
    const {places, match, getPlaceReviews, getPlacesNearby} = this.props;

    const placeId = Number(match.params.id);
    const thisPlace = places.find((place) => place.id === placeId);
    if (thisPlace) {
      this._place = thisPlace;
      getPlaceReviews(placeId);
      getPlacesNearby(placeId);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      places,
      getPlaceReviews,
      getPlacesNearby,
      match,
      location
    } = this.props;

    const placeId = Number(match.params.id);

    if (prevProps.location !== location || prevProps.places !== places) {
      const regex = /^\d+$/;

      if (!regex.test(match.params.id) || placeId > places.length) {
        history.push(AppRoute.ROOT);
        return;
      }

      this._place = places.find((place) => place.id === placeId);
      getPlaceReviews(placeId);
      getPlacesNearby(placeId);
    }

    if (prevProps.location !== location) {
      window.scrollTo(0, 0);
    }
  }

  _renderPlace() {
    const {
      user,
      reviews,
      placesNearby,
      onAddToFavoritesButtonClick,
      isLoading,
      postReview,
    } = this.props;

    const {
      bedrooms,
      description,
      goods,
      host,
      id,
      images,
      is_favorite: isFavorite,
      is_premium: isPremium,
      max_adults: maxAdults,
      price,
      rating,
      title,
      type,
    } = this._place;

    return (
      <div className="page">
        <Header user={user} />
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {images.slice(0, Place.MAX_GALLERY_IMAGES).map((src, i) => {
                  return (
                    <div key={i} className="property__image-wrapper">
                      <img
                        className="property__image"
                        src={src}
                        alt={title}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {isPremium && <div className="property__mark"><span>Premium</span></div>}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <button
                    className={`property__bookmark-button button ${isFavorite ? `property__bookmark-button--active` : ``}`}
                    onClick={() => onAddToFavoritesButtonClick(id, isFavorite)}
                    type="button"
                  >
                    <svg className="property__bookmark-icon" style={isFavorite ? bookmarkIconStyle : null} width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={getRatingWidth(rating)} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms}
                  </li>
                  <li className="property__feature property__feature--adults">
                    {maxAdults}
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {goods.map((good) => <li key={good} className="property__inside-item">{good}</li>)}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="property__avatar user__avatar"
                        src={`/${host.avatar_url}`}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="property__user-name">{host.name}</span>
                    {host.is_pro && <span className="property__user-status">Pro</span>}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">
                    Reviews · <span className="reviews__amount">{reviews.length}</span>
                  </h2>
                  <ReviewsList reviews={reviews}/>
                  {user && <ReviewFormWrapped id={id} postReview={postReview} isLoading={isLoading}/>}
                </section>
              </div>
            </div>
            <section className="property__map map">
              <Map places={placesNearby} currentPlace={this._place}/>
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
            Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                <PlacesList
                  type={PlaceCardType.NEARBY}
                  places={placesNearby}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  render() {
    return this._place ? this._renderPlace() : <div></div>;
  }
}

Property.propTypes = {
  places: PropTypes.arrayOf(placePropTypes),
  placesNearby: PropTypes.arrayOf(placePropTypes),
  user: userPropTypes,
  reviews: PropTypes.arrayOf(reviewPropTypes),
  onAddToFavoritesButtonClick: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  getPlaceReviews: PropTypes.func.isRequired,
  getPlacesNearby: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  postReview: PropTypes.func.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.object,
  }),
};

const mapStateToProps = (state) => ({
  places: getPlaces(state),
  placesNearby: getNearby(state) || [],
  user: getUser(state),
  reviews: getSortedByDateReviews(state) || [],
  isLoading: getLoadingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAddToFavoritesButtonClick(id, isFavorite) {
    dispatch(Operation.setFavorite(id, isFavorite));
  },
  getPlaceReviews(id) {
    dispatch(Operation.getReviews(id));
  },
  getPlacesNearby(id) {
    dispatch(Operation.getPlacesNearby(id));
  },
  postReview(review, onSuccess) {
    dispatch(Operation.postReview(review, onSuccess));
  },
});

export {Property};
export default connect(mapStateToProps, mapDispatchToProps)(Property);

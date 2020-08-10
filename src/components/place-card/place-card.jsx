import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {placePropTypes, AppRoute, cardTypePropTypes} from '../../const.js';
import {getRatingWidth} from '../../utils.js';
import {Operation} from '../../reducer/data/data.js';
import {ActionCreator} from '../../reducer/app/app.js';

const PlaceCard = ({
  type: cardType,
  place,
  onPlaceCardHover,
  updatePlacesNearby,
  onAddToFavoritesButtonClick
}) => {

  const {
    is_premium: isPremium,
    preview_image: image,
    rating,
    price,
    is_favorite: isFavorite,
    title,
    type,
    id
  } = place;

  const placePage = `${AppRoute.OFFER}/${id}`;

  return (
    <article className={`${cardType.CARD_CLASS} place-card`}
      onMouseEnter={() => onPlaceCardHover(place)}
      onMouseLeave={() => onPlaceCardHover(null)}
    >
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`${cardType.WRAPPER_CLASS} place-card__image-wrapper`}>
        <Link to={placePage}>
          <img className="place-card__image" src={image} width={cardType.IMAGE.WIDTH} height={cardType.IMAGE.HEIGHT} alt="Place image" />
        </Link>
      </div>
      <div className={cardType.INFO_CLASS}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isFavorite ? `place-card__bookmark-button--active` : ``} button`}
            type="button"
            onClick={() => {
              onAddToFavoritesButtonClick(id, isFavorite);
              updatePlacesNearby(id);
            }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={getRatingWidth(rating)}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={placePage}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  type: cardTypePropTypes.isRequired,
  place: placePropTypes.isRequired,
  onPlaceCardHover: PropTypes.func.isRequired,
  updatePlacesNearby: PropTypes.func.isRequired,
  onAddToFavoritesButtonClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onAddToFavoritesButtonClick(id, isFavorite) {
    dispatch(Operation.setFavorite(id, isFavorite));
  },
  onPlaceCardHover(place) {
    dispatch(ActionCreator.setActivePlace(place));
  },
  updatePlacesNearby(id) {
    dispatch(Operation.getPlacesNearby(id));
  },
});

export {PlaceCard};
export default connect(null, mapDispatchToProps)(PlaceCard);

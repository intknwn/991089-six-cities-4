import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {placePropTypes} from '../../const.js';
import {Operation} from '../../reducer/data/data.js';

const getRatingWidth = (userRating) => {
  return {
    width: `${Math.round(userRating) * 100 / 5}%`,
  };
};

const PlaceCard = ({isFavoritesCard = false, place, onActiveItemSet, onCardTitleClick, onAddToFavoritesButtonClick}) => {
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

  return (
    <article className={`${isFavoritesCard ? `favorites__card` : `cities__place-card`} place-card`}
      onMouseEnter={() => onActiveItemSet(place)}
      onMouseLeave={() => onActiveItemSet(null)}
    >
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`${isFavoritesCard ? `favorites__image-wrapper` : `cities__image-wrapper`} place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={image} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className={isFavoritesCard ? `favorites__card-info` : `place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isFavorite ? `place-card__bookmark-button--active` : ``} button`}
            type="button"
            onClick={() => onAddToFavoritesButtonClick(id, isFavorite)}
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
          <a onClick={onCardTitleClick} href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  isFavoritesCard: PropTypes.bool.isRequired,
  place: placePropTypes,
  onActiveItemSet: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onAddToFavoritesButtonClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onAddToFavoritesButtonClick(id, isFavorite) {
    dispatch(Operation.setFavorite(id, isFavorite));
  }
});

export {PlaceCard};
export default connect(null, mapDispatchToProps)(PlaceCard);

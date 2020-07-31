import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';
import {OfferType} from '../../const.js';

const PlacesList = ({places, onActiveItemSet, onCardTitleClick}) => {
  return (
    <div className="cities__places-list places__list tabs__content">
      {places.map((place) => {
        return (
          <PlaceCard
            key={place.id}
            place={place}
            onActiveItemSet={onActiveItemSet}
            onCardTitleClick={onCardTitleClick}
          />
        );
      })}
    </div>
  );
};

PlacesList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    "bedrooms": PropTypes.number.isRequired,
    "city": PropTypes.shape({
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
      name: PropTypes.string.isRequired,
    }),
    "description": PropTypes.string.isRequired,
    "goods": PropTypes.arrayOf(PropTypes.string).isRequired,
    "host": PropTypes.shape({
      "avatar_url": PropTypes.string.isRequired,
      "id": PropTypes.number.isRequired,
      "is_pro": PropTypes.bool.isRequired,
      "name": PropTypes.string.isRequired,
    }),
    "id": PropTypes.number.isRequired,
    "images": PropTypes.arrayOf(PropTypes.string).isRequired,
    "is_favorite": PropTypes.bool.isRequired,
    "is_premium": PropTypes.bool.isRequired,
    "location": PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
    "max_adults": PropTypes.number.isRequired,
    "preview_image": PropTypes.string.isRequired,
    "price": PropTypes.number.isRequired,
    "rating": PropTypes.number.isRequired,
    "title": PropTypes.string.isRequired,
    "type": PropTypes.oneOf([OfferType.APARTMENT, OfferType.HOTEL, OfferType.HOUSE, OfferType.ROOM])
  })),
  onActiveItemSet: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired
};

export default PlacesList;

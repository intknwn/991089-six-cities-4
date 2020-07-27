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
            key={place.title}
            placeDetails={place}
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
    picture: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rate: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([OfferType.APARTMENT, OfferType.HOTEL, OfferType.HOUSE, OfferType.ROOM]),
    rating: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  })),
  onActiveItemSet: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired
};

export default PlacesList;

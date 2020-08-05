import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';
import {placePropTypes} from '../../const.js';

const PlacesList = ({places, onActiveItemSet, onCardTitleClick}) => {
  return (
    <div className="cities__places-list places__list tabs__content">
      {places.map((place) => {
        return (
          <PlaceCard
            isFavoritesCard={false}
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
  places: PropTypes.arrayOf(placePropTypes),
  onActiveItemSet: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired
};

export default PlacesList;

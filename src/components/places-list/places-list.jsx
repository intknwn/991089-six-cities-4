import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';
import {placePropTypes, cardTypePropTypes} from '../../const.js';

const PlacesList = ({places, type}) => {
  return places.map((place) => {
    return (
      <PlaceCard
        type={type}
        key={place.id}
        place={place}
      />
    );
  });
};

PlacesList.propTypes = {
  type: cardTypePropTypes,
  places: PropTypes.arrayOf(placePropTypes),
};

export default PlacesList;

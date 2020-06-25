import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import {OfferType} from '../../const.js';

const App = ({places, placesCount}) => (
  <Main
    places={places}
    placesCount={placesCount}
    onCardTitleClick={() => {}}
  />
);

App.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    picture: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rate: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([OfferType.APARTMENT, OfferType.HOTEL, OfferType.HOUSE, OfferType.ROOM]),
    rating: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  })),
  placesCount: PropTypes.number.isRequired,
};

export default App;

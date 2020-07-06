import React from 'react';
import PropTypes from 'prop-types';

const NoPlaces = ({cityName}) => {
  return (
    <div className="cities">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property availbale at the moment in {cityName}</p>
          </div>
        </section>
        <div className="cities__right-section"></div>
      </div>
    </div>
  );
};

NoPlaces.propTypes = {
  cityName: PropTypes.string.isRequired,
};

export default NoPlaces;

import React from 'react';
import PropTypes from 'prop-types';

const CitiesList = ({cities, activeCity, onActiveItemSet}) => {

  return (
    <ul className="locations__list tabs__list">
      {cities.map((cityName) => {
        const isActive = cityName === activeCity;

        return (
          <li className="locations__item" key={cityName}>
            <a
              className={`locations__item-link tabs__item ${isActive ? `tabs__item--active` : ``}`}
              onClick={() => onActiveItemSet(cityName)}
              href="#">
              <span>{cityName}</span>
            </a>
          </li>
        );

      })}
    </ul>
  );
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.string.isRequired,
  onActiveItemSet: PropTypes.func.isRequired
};

export default CitiesList;

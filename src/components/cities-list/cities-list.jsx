import React from 'react';
import PropTypes from 'prop-types';
import {cityPropTypes} from '../../const.js';

const CitiesList = ({cities, activeCity, onActiveItemSet}) => {

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => {
        const isActive = city.name === activeCity.name;

        return (
          <li className="locations__item" key={city.name}>
            <a
              className={`locations__item-link tabs__item ${isActive ? `tabs__item--active` : ``}`}
              onClick={() => onActiveItemSet(city)}
              href="#">
              <span>{city.name}</span>
            </a>
          </li>
        );

      })}
    </ul>
  );
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(cityPropTypes).isRequired,
  activeCity: cityPropTypes,
  onActiveItemSet: PropTypes.func,
};

export default CitiesList;

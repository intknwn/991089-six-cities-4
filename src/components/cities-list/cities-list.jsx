import React from 'react';
import PropTypes from 'prop-types';
import {citiesNames} from '../../const.js';

const CitiesList = ({city, onCityTabClick}) => {

  return (
    <ul className="locations__list tabs__list">
      {citiesNames.map((name) => {
        const isActive = name === city;

        return (
          <li className="locations__item" key={name}>
            <a
              className={`locations__item-link tabs__item ${isActive && `tabs__item--active`}`}
              onClick={() => onCityTabClick(name)}
              href="#">
              <span>{name}</span>
            </a>
          </li>
        );

      })}
    </ul>
  );
};

CitiesList.propTypes = {
  city: PropTypes.string.isRequired,
  onCityTabClick: PropTypes.func.isRequired
};

export default CitiesList;

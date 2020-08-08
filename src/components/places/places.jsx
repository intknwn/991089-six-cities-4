import React from 'react';
import PropTypes from 'prop-types';
import withSortMenu from '../../hocs/with-sort-menu/with-sort-menu.jsx';
import PlacesList from '../places-list/places-list.jsx';
import SortMenu from '../sort-menu/sort-menu.jsx';
import Map from '../map/map.jsx';
import {placePropTypes, cityPropTypes, PlaceCardType} from '../../const.js';

const SortMenuWrapped = withSortMenu(SortMenu);

const Places = ({places, activeCity}) => {

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{places.length} {places.length === 1 ? `place` : `places`} to stay in {activeCity.name}</b>
          <SortMenuWrapped />
          <div className="cities__places-list places__list tabs__content">
            <PlacesList
              type={PlaceCardType.PLACE}
              places={places}
            />
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map
              places={places}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

Places.propTypes = {
  places: PropTypes.arrayOf(placePropTypes),
  activeCity: cityPropTypes.isRequired,
};

export default Places;

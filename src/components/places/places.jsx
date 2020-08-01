import React from 'react';
import PropTypes from 'prop-types';
import PlacesList from '../places-list/places-list.jsx';
import Map from '../map/map.jsx';
import {placePropTypes} from '../../const.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';

const PlacesListWrapped = withActiveItem(PlacesList);

const Places = ({places, activeCity, onCardTitleClick}) => {

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{places.length} {places.length === 1 ? `place` : `places`} to stay in {activeCity}</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
          Popular
              <svg className="places__sorting-arrow" width={7} height={4}>
                <use xlinkHref="#icon-arrow-select" />
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0}>Price: low to high</li>
              <li className="places__option" tabIndex={0}>Price: high to low</li>
              <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
            {/*
      <select class="places__sorting-type" id="places-sorting">
        <option class="places__option" value="popular" selected="">Popular</option>
        <option class="places__option" value="to-high">Price: low to high</option>
        <option class="places__option" value="to-low">Price: high to low</option>
        <option class="places__option" value="top-rated">Top rated first</option>
      </select>
      */}
          </form>
          {<PlacesListWrapped
            places={places}
            onActiveItemSet={() => {}}
            onCardTitleClick={onCardTitleClick}
          />}
        </section>
        <div className="cities__right-section">
          <Map
            places={places}
          />
        </div>
      </div>
    </div>
  );
};

Places.propTypes = {
  places: PropTypes.arrayOf(placePropTypes),
  activeCity: PropTypes.string.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};

export default Places;

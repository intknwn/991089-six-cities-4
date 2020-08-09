import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Header from '../header/header.jsx';
import PlacesList from '../places-list/places-list.jsx';
import {placePropTypes, userPropTypes, AppRoute, PlaceCardType} from '../../const.js';
import {getCitiesNames} from '../../utils.js';
import {getFavorites} from '../../reducer/data/selectors.js';
import {getUser} from '../../reducer/user/selectors.js';

const Favorites = ({places, user}) => {
  const citiesNames = getCitiesNames(places);

  return (
    <div className={`page ${places.length ? `` : `page--favorites-empty`}`}>
      <Header user={user} />
      <main className={`"page__main page__main page__main--favorites ${places.length ? `` : `page__main--favorites-empty`}`}>
        <div className="page__favorites-container container">
          {places.length ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {citiesNames.map((cityName) => {
                  return (
                    <li key={cityName} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{cityName}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        <PlacesList
                          type={PlaceCardType.FAVORITE}
                          places={places.filter(({city}) => city.name === cityName)}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section> :
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
              </div>
            </section>}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.ROOT}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </Link>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  places: PropTypes.arrayOf(placePropTypes),
  user: userPropTypes,
};

const mapStateToProps = (state) => ({
  places: getFavorites(state),
  user: getUser(state),
});

export {Favorites};
export default connect(mapStateToProps)(Favorites);

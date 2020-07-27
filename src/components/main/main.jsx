import React from 'react';
import PropTypes from 'prop-types';
import {OfferType} from '../../const.js';
import CitiesList from '../cities-list/cities-list.jsx';
import Places from '../places/places.jsx';
import NoPlaces from '../no-places/no-places.jsx';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';

const CitiesListWrapped = withActiveItem(CitiesList);

const Main = ({
  city,
  onCardTitleClick,
  onCityTabClick,
}) => {

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className={`page__main page__main--index ${city.offers.length === 0 ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesListWrapped
              city={city.name}
              onActiveItemSet={onCityTabClick}
            />
          </section>
        </div>
        {city.offers.length === 0 ?
          <NoPlaces cityName={city.name}/> :
          <Places
            city={city}
            onCardTitleClick={onCardTitleClick}
          />}
      </main>
    </div>
  );
};

Main.propTypes = {
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
    offers: PropTypes.arrayOf(PropTypes.shape({
      picture: PropTypes.string.isRequired,
      isPremium: PropTypes.bool.isRequired,
      rate: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf([OfferType.APARTMENT, OfferType.HOTEL, OfferType.HOUSE, OfferType.ROOM]),
      rating: PropTypes.number.isRequired,
      isFavorite: PropTypes.bool.isRequired,
    })),
  }),
  onCardTitleClick: PropTypes.func.isRequired,
  onCityTabClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.cities.find((city) => city.name === state.activeCity),
});

const mapDispatchToProps = (dispatch) => ({
  onCityTabClick(city) {
    dispatch(ActionCreator.setCity(city));
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import Places from '../places/places.jsx';
import NoPlaces from '../no-places/no-places.jsx';
import {placePropTypes, userPropTypes} from '../../const.js';
import {Screen} from '../../const.js';
import {getPlacesByCity, getCities} from '../../reducer/data/selectors.js';
import {getActiveCity} from '../../reducer/app/selectors.js';
import {ActionCreator} from '../../reducer/app/app.js';
import {getUser} from '../../reducer/user/selectors.js';

const CitiesListWrapped = withActiveItem(CitiesList);

const Main = ({
  places,
  cities,
  activeCity,
  user,
  renderSignInScreen,
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
                  <a className="header__nav-link header__nav-link--profile" href="#" onClick={user ? null : renderSignInScreen}>
                    <div
                      style={user ? {
                        backgroundImage: user.avatar_url && `url(https://4.react.pages.academy/six-cities${user.avatar_url})`,
                      } : {}}
                      className="header__avatar-wrapper user__avatar-wrapper"
                    >
                    </div>
                    <span className="header__user-name user__name">{user ? user.email : `Sign In`}</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className={`page__main page__main--index ${places.length ? `` : `page__main--index-empty`}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesListWrapped
              cities={cities}
              activeCity={activeCity}
              onActiveItemSet={onCityTabClick}
            />
          </section>
        </div>
        {places.length ?
          <Places
            places={places}
            activeCity={activeCity}
            onCardTitleClick={onCardTitleClick}
          /> :
          <NoPlaces activeCity={activeCity}/>}
      </main>
    </div>
  );
};

Main.propTypes = {
  places: PropTypes.arrayOf(placePropTypes),
  cities: PropTypes.arrayOf(PropTypes.string),
  activeCity: PropTypes.string.isRequired,
  user: userPropTypes,
  renderSignInScreen: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onCityTabClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  places: getPlacesByCity(state),
  cities: getCities(state),
  activeCity: getActiveCity(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityTabClick(city) {
    dispatch(ActionCreator.setCity(city));
  },
  renderSignInScreen() {
    dispatch(ActionCreator.setScreen(Screen.SIGN_IN));
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);

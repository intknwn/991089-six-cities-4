import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import Places from '../places/places.jsx';
import NoPlaces from '../no-places/no-places.jsx';
import Header from '../../components/header/header.jsx';
import {placePropTypes, userPropTypes} from '../../const.js';
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
  onCityTabClick,
  onCardTitleClick = () => {},
}) => {

  return (
    <div className="page page--gray page--main">
      <Header user={user}/>
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
  onCityTabClick: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func,
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
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);

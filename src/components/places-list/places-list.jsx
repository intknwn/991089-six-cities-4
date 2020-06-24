import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';
import {OfferType} from '../../const.js';

class PlacesList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };

    this.handleCardMouseEnter = this.handleCardMouseEnter.bind(this);
    this.handleCardMouseLeave = this.handleCardMouseLeave.bind(this);
  }

  handleCardMouseEnter(card) {
    this.setState({activeCard: card});
  }

  handleCardMouseLeave() {
    this.setState({activeCard: null});
  }

  render() {
    const {places, onCardTitleClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {places.map((place, i) => {
          return (
            <PlaceCard
              key={`${i}-${place.title}`}
              placeDetails={place}
              onMouseEnter={this.handleCardMouseEnter}
              onMouseLeave={this.handleCardMouseLeave}
              onCardTitleClick={onCardTitleClick}
            />
          );
        })}
      </div>
    );
  }
}

PlacesList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    picture: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rate: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([OfferType.APARTMENT, OfferType.HOTEL, OfferType.HOUSE, OfferType.ROOM]),
    rating: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  })),
  onCardTitleClick: PropTypes.func.isRequired
};

export default PlacesList;

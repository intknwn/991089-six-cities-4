import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {OfferType} from '../../const.js';

const DEFAULT_POSITION = [52.38333, 4.9];
const DEFAULT_ZOOM = 12;
const MAP_CONFIG = {
  center: DEFAULT_POSITION,
  zoom: DEFAULT_ZOOM,
  zoomControl: false,
  marker: true,
};
const ICON_CONFIG = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
  }

  render() {
    return <section className="cities__map map" ref={this.mapRef}/>;
  }

  componentDidMount() {
    const container = this.mapRef.current;
    const {places} = this.props;

    const map = leaflet.map(container, MAP_CONFIG);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    map.setView(DEFAULT_POSITION, DEFAULT_ZOOM);

    if (places) {
      places.forEach((place) => {
        leaflet
          .marker(place.location, {ICON_CONFIG})
          .addTo(map);
      });
    }
  }
}

export default Map;

Map.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    picture: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rate: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([OfferType.APARTMENT, OfferType.HOTEL, OfferType.HOUSE, OfferType.ROOM]),
    rating: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  })),
};

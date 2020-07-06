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

class Map extends React.Component {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
    this._map = null;
    this._layerGroup = null;
  }

  render() {
    return <section className="cities__map map" ref={this._mapRef}/>;
  }

  _createMap() {
    if (!this._mapRef || !this._mapRef.current) {
      return;
    }

    const container = this._mapRef.current;
    const {cityCoords, places} = this.props;

    this._map = leaflet.map(container, MAP_CONFIG);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);

    this._map.setView(cityCoords, DEFAULT_ZOOM);

    if (places) {
      this._addMarkers(places);
    }
  }

  _addMarkers(places) {
    const markers = places.map((place) => {
      return leaflet.marker(place.location, {ICON_CONFIG});
    });

    this._layerGroup = leaflet.layerGroup(markers).addTo(this._map);
  }

  componentDidMount() {
    this._createMap();
  }

  componentDidUpdate(prevProps) {
    const {cityCoords, places} = this.props;

    if (prevProps.places !== places) {
      this._layerGroup.clearLayers();
      this._addMarkers(places);
      this._map.setView(cityCoords, DEFAULT_ZOOM);
    }
  }

  componentWillUnmount() {
    this.destroy();
  }

  destroy() {
    this._map.remove();
    this._map = null;
    this._layerGroup = null;
  }
}

export default Map;

Map.propTypes = {
  cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
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

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
    this._cityLocation = null;
  }

  render() {
    return <section className="cities__map map" ref={this._mapRef}/>;
  }

  _createMap() {
    if (!this._mapRef || !this._mapRef.current) {
      return;
    }

    const container = this._mapRef.current;
    const {places} = this.props;

    const {latitude, longitude, zoom} = places[0].city.location;
    const cityCoords = [latitude, longitude];

    this._map = leaflet.map(container, MAP_CONFIG);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);

    this._map.setView(cityCoords, zoom);

    if (places) {
      this._addMarkers(places);
    }
  }

  _addMarkers(places) {
    const markers = places.map((place) => {
      const {latitude, longitude} = place.location;

      return leaflet.marker([latitude, longitude], {ICON_CONFIG});
    });

    this._layerGroup = leaflet.layerGroup(markers).addTo(this._map);
  }

  componentDidMount() {
    this._createMap();
  }

  componentDidUpdate(prevProps) {
    const {places} = this.props;

    const {latitude, longitude, zoom} = places[0].city.location;
    const cityCoords = [latitude, longitude];

    if (prevProps.places !== places) {
      this._layerGroup.clearLayers();
      this._addMarkers(places);
      this._map.setView(cityCoords, zoom);
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
  places: PropTypes.arrayOf(PropTypes.shape({
    "bedrooms": PropTypes.number.isRequired,
    "city": PropTypes.shape({
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
      name: PropTypes.string.isRequired,
    }),
    "description": PropTypes.string.isRequired,
    "goods": PropTypes.arrayOf(PropTypes.string).isRequired,
    "host": PropTypes.shape({
      "avatar_url": PropTypes.string.isRequired,
      "id": PropTypes.number.isRequired,
      "is_pro": PropTypes.bool.isRequired,
      "name": PropTypes.string.isRequired,
    }),
    "id": PropTypes.number.isRequired,
    "images": PropTypes.arrayOf(PropTypes.string).isRequired,
    "is_favorite": PropTypes.bool.isRequired,
    "is_premium": PropTypes.bool.isRequired,
    "location": PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
    "max_adults": PropTypes.number.isRequired,
    "preview_image": PropTypes.string.isRequired,
    "price": PropTypes.number.isRequired,
    "rating": PropTypes.number.isRequired,
    "title": PropTypes.string.isRequired,
    "type": PropTypes.oneOf([OfferType.APARTMENT, OfferType.HOTEL, OfferType.HOUSE, OfferType.ROOM])
  })),
};

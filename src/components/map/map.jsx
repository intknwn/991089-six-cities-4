import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {placePropTypes, cityPropTypes, MapData} from '../../const.js';
import {getActiveCity, getActivePlace} from '../../reducer/app/selectors.js';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
    this._map = null;

    this._currentPlace = this.props.currentPlace;

    this._placesLayer = null;
    this._activePlaceLayer = null;

    this._cityLocation = null;

    this._icon = null;
    this._activeIcon = null;
  }

  componentDidMount() {
    const {places, activePlace} = this.props;

    this._placesLayer = leaflet.layerGroup();
    this._activePlaceLayer = leaflet.layerGroup();

    this._icon = leaflet.icon(MapData.ICON);
    this._activeIcon = leaflet.icon(MapData.ACTIVE_ICON);

    this._createMap();

    if (activePlace) {
      this._addMarkersWithActive(places, activePlace);
    } else {
      this._addMarkers(places);
    }
  }

  componentDidUpdate(prevProps) {
    const {places, activePlace, currentPlace, activeCity} = this.props;

    this._currentPlace = currentPlace;

    this._placesLayer.clearLayers();
    this._activePlaceLayer.clearLayers();

    if (prevProps.activeCity !== activeCity) {
      const {latitude, longitude, zoom} = activeCity.location;
      this._map.setView([latitude, longitude], zoom);
    }

    if (activePlace) {
      this._addMarkersWithActive(places, activePlace);
    } else if (this._currentPlace) {
      this._addMarkersWithActive(places, this._currentPlace);
    } else {
      this._addMarkers(places);
    }
  }

  componentWillUnmount() {
    this._destroy();
  }

  _destroy() {
    this._map.remove();
    this._map = null;
    this._placesLayer = null;
    this._activePlaceLayer = null;
  }

  _createMap() {
    if (!this._mapRef || !this._mapRef.current) {
      return;
    }

    const container = this._mapRef.current;
    const {activeCity} = this.props;

    const {latitude, longitude, zoom} = activeCity.location;

    this._map = leaflet.map(container, MapData.CONFIG);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);

    this._map.setView([latitude, longitude], zoom);
  }

  _addMarkers(places, icon = this._icon) {
    places.forEach((place) => {
      const {latitude, longitude} = place.location;

      this._placesLayer.addLayer(leaflet.marker([latitude, longitude], {icon}));
    });

    this._placesLayer.addTo(this._map);
  }

  _addMarkersWithActive(places, activePlace) {
    const {latitude, longitude} = activePlace.location;
    const notActivePlaces = places.filter((place) => place !== activePlace);
    const icon = this._activeIcon;

    this._addMarkers(notActivePlaces);

    const activeMarker = leaflet.marker([latitude, longitude], {icon});
    this._activePlaceLayer.addLayer(activeMarker);
    this._activePlaceLayer.addTo(this._map);
  }

  render() {
    return <div
      ref={this._mapRef}
      style={{
        height: `100%`,
      }}
    />;
  }
}

Map.propTypes = {
  places: PropTypes.arrayOf(placePropTypes),
  currentPlace: placePropTypes,
  activePlace: placePropTypes,
  activeCity: cityPropTypes.isRequired,
};

const mapStateToProps = (state) => ({
  activeCity: getActiveCity(state),
  activePlace: getActivePlace(state),
});

export {Map};
export default connect(mapStateToProps)(Map);



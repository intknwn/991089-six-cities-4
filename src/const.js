import PropTypes from 'prop-types';

export const OfferType = {
  APARTMENT: `apartment`,
  ROOM: `room`,
  HOUSE: `house`,
  HOTEL: `hotel`
};

export const citiesNames = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];

export const placePropTypes = PropTypes.shape({
  "bedrooms": PropTypes.number.isRequired,
  "city": PropTypes.shape({
    "location": PropTypes.shape({
      "latitude": PropTypes.number.isRequired,
      "longitude": PropTypes.number.isRequired,
      "zoom": PropTypes.number.isRequired,
    }),
    "name": PropTypes.string.isRequired,
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
    "latitude": PropTypes.number.isRequired,
    "longitude": PropTypes.number.isRequired,
    "zoom": PropTypes.number.isRequired,
  }),
  "max_adults": PropTypes.number.isRequired,
  "preview_image": PropTypes.string.isRequired,
  "price": PropTypes.number.isRequired,
  "rating": PropTypes.number.isRequired,
  "title": PropTypes.string.isRequired,
  "type": PropTypes.oneOf([OfferType.APARTMENT, OfferType.HOTEL, OfferType.HOUSE, OfferType.ROOM])
});

export const userPropTypes = PropTypes.shape({
  "avatar_url": PropTypes.string.isRequired,
  "email": PropTypes.string.isRequired,
  "id": PropTypes.number.isRequired,
  "is_pro": PropTypes.bool.isRequired,
  "name": PropTypes.string.isRequired,
});

export const Screen = {
  MAIN: `MAIN`,
  SIGN_IN: `SIGN_IN`,
};

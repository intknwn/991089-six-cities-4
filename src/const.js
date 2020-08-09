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

export const reviewPropTypes = PropTypes.shape({
  "comment": PropTypes.string.isRequired,
  "date": PropTypes.string.isRequired,
  "id": PropTypes.number.isRequired,
  "rating": PropTypes.number.isRequired,
  "user": PropTypes.shape({
    "avatar_url": PropTypes.string.isRequired,
    "id": PropTypes.number.isRequired,
    "is_pro": PropTypes.bool.isRequired,
    "name": PropTypes.string.isRequired,
  }),
});

export const cityPropTypes = PropTypes.shape({
  "location": PropTypes.shape({
    "latitude": PropTypes.number.isRequired,
    "longitude": PropTypes.number.isRequired,
    "zoom": PropTypes.number.isRequired,
  }),
  "name": PropTypes.string.isRequired,
});

export const cardTypePropTypes = PropTypes.shape({
  "CARD_CLASS": PropTypes.string.isRequired,
  "WRAPPER_CLASS": PropTypes.string.isRequired,
  "INFO_CLASS": PropTypes.string.isRequired,
  "IMAGE": PropTypes.shape({
    "WIDTH": PropTypes.number.isRequired,
    "HEIGHT": PropTypes.number.isRequired,
  }),
});

export const AppRoute = {
  SIGN_IN: `/login`,
  ROOT: `/`,
  FAVORITES: `/favorites`,
  PLACE: `/place`,
};

export const Place = {
  MAX_GALLERY_IMAGES: 6,
};

export const Review = {
  MAX_PER_PAGE: 10,
};

export const ReviewsForm = {
  MIN_COMMENT_LENGTH: 50,
  MAX_COMMENT_LENGTH: 300,
  MAX_RATE: 5,
};

export const PlaceCardType = {
  PLACE: {
    CARD_CLASS: `cities__place-card`,
    WRAPPER_CLASS: `cities__image-wrapper`,
    INFO_CLASS: `place-card__info`,
    IMAGE: {
      WIDTH: 260,
      HEIGHT: 200,
    },
  },
  FAVORITE: {
    CARD_CLASS: `favorites__card`,
    WRAPPER_CLASS: `favorites__image-wrapper`,
    INFO_CLASS: `favorites__card-info`,
    IMAGE: {
      WIDTH: 150,
      HEIGHT: 110,
    },
  },
  NEARBY: {
    CARD_CLASS: `near-places__card`,
    WRAPPER_CLASS: `near-places__image-wrapper`,
    INFO_CLASS: `place-card__info`,
    IMAGE: {
      WIDTH: 260,
      HEIGHT: 200,
    },
  }
};

export const MapData = {
  CONFIG: {
    zoomControl: false,
    scrollWheelZoom: false,
    marker: true,
  },
  ICON: {
    iconUrl: `/img/pin.svg`,
    iconSize: [27, 39],
  },
  ACTIVE_ICON: {
    iconUrl: `/img/pin-active.svg`,
    iconSize: [27, 39],
  },
};

export const SortType = {
  POPULAR: `Popular`,
  LOW_HIGHT: `Price: low to high`,
  HIGHT_LOW: `Price: high to low`,
  TOP_RATED: `Top rated first`
};

// Фикс для отсутствующих стилей в main.css
export const bookmarkIconStyle = {
  stroke: `#4481c3`,
  fill: `#4481c3`
};

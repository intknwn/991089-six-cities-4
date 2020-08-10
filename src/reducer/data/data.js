import {SortType} from '../../const.js';
import {extend, getCities, updatePlaces} from '../../utils.js';
import {ActionCreator as AppActionCreator} from '../app/app.js';


const initialState = {
  places: [],
  cities: [],
  favorites: [],
  reviews: [],
  placesNearby: [],
  sortType: SortType.POPULAR,
};

const ActionType = {
  LOAD_PLACES: `LOAD_PLACES`,
  UPDATE_PLACE: `UPDATE_PLACE`,
  SET_CITIES: `SET_CITIES`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  GET_FAVORITES: `GET_FAVORITES`,
  GET_REVIEWS: `GET_REVIEWS`,
  GET_PLACES_NEARBY: `GET_PLACES_NEARBY`,
};

const ActionCreator = {
  loadPlaces: (places) => {
    return {
      type: ActionType.LOAD_PLACES,
      payload: places,
    };
  },
  setCities: (cities) => {
    return {
      type: ActionType.SET_CITIES,
      payload: cities,
    };
  },
  updatePlace: (place) => {
    return {
      type: ActionType.UPDATE_PLACE,
      payload: place,
    };
  },
  getFavorites: (favorites) => {
    return {
      type: ActionType.GET_FAVORITES,
      payload: favorites,
    };
  },
  getReviews: (reviews) => {
    return {
      type: ActionType.GET_REVIEWS,
      payload: reviews,
    };
  },
  getPlacesNearby: (places) => {
    return {
      type: ActionType.GET_PLACES_NEARBY,
      payload: places,
    };
  },
  setSortType: (sortType) => {
    return {
      type: ActionType.SET_SORT_TYPE,
      payload: sortType,
    };
  }
};

const Operation = {
  loadPlaces: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const cities = getCities(response.data);

        dispatch(AppActionCreator.setCity(cities[0]));
        dispatch(ActionCreator.loadPlaces(response.data));
        dispatch(ActionCreator.setCities(cities));
      });
  },
  setFavorite: (id, isFavorite) => (dispatch, getState, api) => {
    const status = isFavorite ? 0 : 1;
    return api.post(`/favorite/${id}/${status}`)
      .then((response) => {
        dispatch(ActionCreator.updatePlace(response.data));
        dispatch(Operation.getFavorites());
      });
  },
  getFavorites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.getFavorites(response.data));
      });
  },
  getReviews: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.getReviews(response.data));
      });
  },
  postReview: ({comment, id, rating}) => (dispatch, getState, api) => {
    const review = {
      comment,
      rating: Number(rating),
    };

    dispatch(AppActionCreator.setLoadingStatus(true));

    return api.post(`/comments/${id}`, review)
      .then((response) => {
        dispatch(ActionCreator.getReviews(response.data));
      })
      .then(() => {
        dispatch(AppActionCreator.setLoadingStatus(false));
      })
      .catch(() => {
        dispatch(AppActionCreator.setLoadingStatus(false));
      });
  },
  getPlacesNearby: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`)
      .then((response) => {
        dispatch(ActionCreator.getPlacesNearby(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_PLACES:
      return extend(state, {
        places: action.payload
      });
    case ActionType.SET_CITIES:
      return extend(state, {
        cities: action.payload
      });
    case ActionType.UPDATE_PLACE:
      return extend(state, {
        places: updatePlaces(state.places, action.payload)
      });
    case ActionType.GET_FAVORITES:
      return extend(state, {
        favorites: action.payload
      });
    case ActionType.GET_REVIEWS:
      return extend(state, {
        reviews: action.payload
      });
    case ActionType.GET_PLACES_NEARBY:
      return extend(state, {
        placesNearby: action.payload
      });
    case ActionType.SET_SORT_TYPE:
      return extend(state, {
        sortType: action.payload
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};

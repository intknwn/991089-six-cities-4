import {extend, getCitiesNames, updatePlaces} from '../../utils.js';
import {ActionCreator as AppActionCreator} from '../app/app.js';

const initialState = {
  places: [],
  cities: [],
  favorites: [],
};

const ActionType = {
  LOAD_PLACES: `LOAD_PLACES`,
  SET_CITIES: `SET_CITIES`,
  UPDATE_PLACE: `UPDATE_PLACE`,
  GET_FAVORITES: `GET_FAVORITES`,
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
};

const Operation = {
  loadPlaces: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const cities = getCitiesNames(response.data);

        dispatch(ActionCreator.loadPlaces(response.data));
        dispatch(ActionCreator.setCities(cities));
        dispatch(AppActionCreator.setCity(cities[0]));
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
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};

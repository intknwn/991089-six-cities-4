import {extend, getCitiesNames} from '../../utils.js';
import {ActionCreator as AppActionCreator} from '../app/app.js';

const initialState = {
  places: [],
  cities: [],
};

const ActionType = {
  LOAD_PLACES: `LOAD_PLACES`,
  SET_CITIES: `SET_CITIES`,
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
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};

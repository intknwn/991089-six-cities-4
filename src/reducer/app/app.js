import {extend} from '../../utils.js';

const initialState = {
  activeCity: {
    name: ``,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    }
  },
  activePlace: null,
  error: null,
  isLoading: false,
};

const ActionType = {
  SET_CITY: `SET_CITY`,
  CATCH_ERROR: `CATCH_ERROR`,
  SET_LOADING_STATUS: `SET_LOADING_STATUS`,
  SET_ACTIVE_PLACE: `SET_ACTIVE_PLACE`,
};

const ActionCreator = {
  setCity: (city) => ({
    type: ActionType.SET_CITY,
    payload: city,
  }),
  catchError: (err) => ({
    type: ActionType.CATCH_ERROR,
    payload: err,
  }),
  setLoadingStatus: (status) => ({
    type: ActionType.SET_LOADING_STATUS,
    payload: status,
  }),
  setActivePlace: (place) => ({
    type: ActionType.SET_ACTIVE_PLACE,
    payload: place,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CITY:
      return extend(state, {
        activeCity: action.payload,
      });
    case ActionType.CATCH_ERROR:
      return extend(state, {
        error: action.payload
      });
    case ActionType.SET_LOADING_STATUS:
      return extend(state, {
        isLoading: action.payload
      });
    case ActionType.SET_ACTIVE_PLACE:
      return extend(state, {
        activePlace: action.payload
      });
  }

  return state;
};

export {ActionType, ActionCreator, reducer};

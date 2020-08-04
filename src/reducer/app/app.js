import {extend} from '../../utils.js';

const initialState = {
  activeCity: ``,
  error: null,
};

const ActionType = {
  SET_CITY: `SET_CITY`,
  CATCH_ERROR: `CATCH_ERROR`,
};

const ActionCreator = {
  setCity: (cityName) => ({
    type: ActionType.SET_CITY,
    payload: cityName,
  }),
  catchError: (err) => ({
    type: ActionType.CATCH_ERROR,
    payload: err,
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
  }

  return state;
};

export {ActionType, ActionCreator, reducer};

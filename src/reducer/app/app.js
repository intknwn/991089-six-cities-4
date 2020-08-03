import {extend} from '../../utils.js';
import {Screen} from '../../const.js';

const initialState = {
  activeCity: ``,
  error: null,
  screen: Screen.MAIN,
};

const ActionType = {
  SET_CITY: `SET_CITY`,
  CATCH_ERROR: `CATCH_ERROR`,
  SET_SCREEN: `SET_SCREEN`,
};

const ActionCreator = {
  setCity: (cityName) => ({
    type: ActionType.SET_CITY,
    payload: cityName,
  }),
  setScreen: (screen) => ({
    type: ActionType.SET_SCREEN,
    payload: screen,
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
    case ActionType.SET_SCREEN:
      return extend(state, {
        screen: action.payload
      });
  }

  return state;
};

export {ActionType, ActionCreator, reducer};

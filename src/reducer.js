import {extend} from "./utils.js";
import {cities} from './mocks/cities.js';
import {citiesNames} from './const.js';

const initialState = {
  cities,
  activeCity: citiesNames[0],
};

const ActionType = {
  SET_CITY: `SET_CITY`,
};

const ActionCreator = {
  setCity: (cityName) => ({
    type: ActionType.SET_CITY,
    payload: cityName,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CITY:
      return extend(state, {
        activeCity: action.payload,
      });
  }

  return state;
};

export {ActionType, ActionCreator, reducer};

import {extend} from "./utils.js";
import {cities} from './mocks/cities.js';

const initialState = {
  city: cities[0],
};

const ActionType = {
  SET_CITY: `SET_CITY`,
};

const ActionCreator = {
  setCity: (cityName) => ({
    type: ActionType.SET_CITY,
    payload: cities.find((city) => city.name === cityName),
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CITY:
      return extend(state, {
        city: action.payload,
      });
  }

  return state;
};

export {ActionType, ActionCreator, reducer};

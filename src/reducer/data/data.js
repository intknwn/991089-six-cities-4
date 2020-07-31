import {extend} from '../../utils.js';

const initialState = {
  places: [],
};

const ActionType = {
  LOAD_PLACES: `LOAD_PLACES`,
};

const ActionCreator = {
  loadPlaces: (places) => {
    return {
      type: ActionType.LOAD_PLACES,
      payload: places,
    };
  }
};

const Operation = {
  loadPlaces: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadPlaces(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_PLACES:
      return extend(state, {
        places: action.payload
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};

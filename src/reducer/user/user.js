import {extend} from '../../utils.js';
import history from '../../history.js';
import {AppRoute} from '../../const.js';
import {Operation as DataOperation} from '../data/data.js';

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: null,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_USER: `SET_USER`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  setUser: (user) => {
    return {
      type: ActionType.SET_USER,
      payload: user,
    };
  },
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.setUser(response.data));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(DataOperation.getFavorites());
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.setUser(response.data));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(DataOperation.getFavorites());
        history.push(AppRoute.ROOT);
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.SET_USER:
      return extend(state, {
        user: action.payload
      });
  }

  return state;
};


export {AuthorizationStatus, ActionCreator, ActionType, Operation, reducer};

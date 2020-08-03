import NameSpace from '../name-space.js';

export const getActiveCity = (state) => {
  return state[NameSpace.APP].activeCity;
};

export const getError = (state) => {
  return state[NameSpace.APP].error;
};

export const getScreen = (state) => {
  return state[NameSpace.APP].screen;
};

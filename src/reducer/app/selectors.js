import NameSpace from '../name-space.js';

export const getActiveCity = (state) => {
  return state[NameSpace.APP].activeCity;
};

export const getError = (state) => {
  return state[NameSpace.APP].error;
};

export const getLoadingStatus = (state) => {
  return state[NameSpace.APP].isLoading;
};

export const getActivePlace = (state) => {
  return state[NameSpace.APP].activePlace;
};


import {citiesNames} from '../../const.js';
import {Screen} from '../../const.js';
import {ActionType, ActionCreator, reducer} from './app.js';

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    activeCity: ``,
    error: null,
    screen: Screen.MAIN,
  });
});

it(`Reducer should change active city`, () => {
  expect(reducer({
    activeCity: citiesNames[0],
  }, {
    type: ActionType.SET_CITY,
    payload: citiesNames[1],
  })).toEqual({
    activeCity: citiesNames[1],
  });
});

it(`Reducer should change error message`, () => {
  expect(reducer({
    error: null,
  }, {
    type: ActionType.CATCH_ERROR,
    payload: `some error`,
  })).toEqual({
    error: `some error`,
  });
});

it(`Reducer should change screen`, () => {
  expect(reducer({
    screen: Screen.MAIN,
  }, {
    type: ActionType.SET_SCREEN,
    payload: Screen.SIGN_IN,
  })).toEqual({
    screen: Screen.SIGN_IN,
  });
});

describe(`Action creator works correctly`, () => {
  it(`Action creator for changing city returns correct action`, () => {
    expect(ActionCreator.setCity(citiesNames[1])).toEqual({
      type: ActionType.SET_CITY,
      payload: citiesNames[1],
    });
  });

  it(`Action creator for catching errors returns correct action`, () => {
    expect(ActionCreator.catchError(`some error`)).toEqual({
      type: ActionType.CATCH_ERROR,
      payload: `some error`,
    });
  });

  it(`Action creator for changing screens returns correct action`, () => {
    expect(ActionCreator.setScreen(Screen.SIGN_IN)).toEqual({
      type: ActionType.SET_SCREEN,
      payload: Screen.SIGN_IN,
    });
  });
});

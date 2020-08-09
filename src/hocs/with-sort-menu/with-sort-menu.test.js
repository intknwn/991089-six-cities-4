import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import withSortMenu from './with-sort-menu.jsx';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

const MockComponent = ({onSortClick}) => {
  return (
    <div>
      <li onClick={() => onSortClick()}></li>
    </div>
  );
};

MockComponent.propTypes = {
  onSortClick: PropTypes.func.isRequired
};

const MockComponentWrapped = withSortMenu(MockComponent);

it(`withSortMenu render`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      sortType: `top rated`,
    },
  });

  const tree = renderer.create((
    <Provider store={store}>
      <MockComponentWrapped
        onSortClick={() => {}}
      />
    </Provider>
  )).toJSON();

  expect(tree).toMatchSnapshot();
});


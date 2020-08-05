import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from "react-router-dom";
import Header from './header.jsx';
import history from '../../history.js';

const user = {
  "avatar_url": `img/1.png`,
  "email": `Oliver.conner@gmail.com`,
  "id": 1,
  "is_pro": false,
  "name": `Oliver.conner`,
};

it(`Header render`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Header
            user={user}
          />
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

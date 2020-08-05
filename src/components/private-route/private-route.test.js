import React from "react";
import {MemoryRouter} from "react-router-dom";
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {PrivateRoute} from './private-route.jsx';

configure({
  adapter: new Adapter()
});

const Component = () => {
  return <div></div>;
};

describe(`PrivateRoute`, () => {
  it(`Should render component if user has been authenticated`, () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={[`/favorites`]}>
          <PrivateRoute
            render={() => <Component />}
            path={`/favorites`}
            exact
            authorizationStatus={AuthorizationStatus.AUTH}
          />
        </MemoryRouter>
    );

    expect(wrapper.exists(Component)).toBe(true);
  });

  it(`Should redirect if user hasn't been authenticated`, () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={[`/favorites`]}>
          <PrivateRoute
            render={() => <Component />}
            path={`/favorites`}
            exact
            authorizationStatus={AuthorizationStatus.NO_AUTH}
          />
        </MemoryRouter>
    );

    expect(wrapper.exists(Component)).toBe(false);
  });
});

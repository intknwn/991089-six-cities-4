import React from 'react';
import Notifications from 'react-notify-toast';
import {Switch, Route, Router} from "react-router-dom";
import Main from '../main/main.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import Property from '../property/property.jsx';
import Favorites from '../favorites/favorites.jsx';
import {AppRoute} from '../../const.js';
import history from '../../history.js';
import PrivateRoute from '../private-route/private-route.jsx';

const App = () => {
  return (
    <Router history={history}>
      <Notifications />
      <Switch>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={() => <Favorites />}
        />
        <Route exact path={`${AppRoute.PLACE}/:id?`} component={Property}/>
        <Route exact path={AppRoute.SIGN_IN} component={SignIn} />
        <Route exact path={AppRoute.ROOT} component={Main} />
      </Switch>
    </Router>
  );
};

export default App;

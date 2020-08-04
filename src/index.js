import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {notify} from 'react-notify-toast';
import {AppRoute} from './const.js';
import history from './history.js';
import App from './components/app/app.jsx';
import {createAPI} from './api.js';
import {Operation as DataOperation} from './reducer/data/data.js';
import {ActionCreator, AuthorizationStatus, Operation as UserOperation} from './reducer/user/user.js';
import reducer from './reducer/reducer.js';


const onError = (err) => {
  notify.show(err, `error`);
  store.dispatch(ActionCreator.catchError(err));
};

const onUnauthorized = ({method, url}) => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
  if (method !== `get` && url !== `/login`) {
    history.push(AppRoute.SIGN_IN);
  }
};

const api = createAPI(onError, onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(DataOperation.loadPlaces());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);

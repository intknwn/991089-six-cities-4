import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer.js';
import thunk from 'redux-thunk';
import {notify} from 'react-notify-toast';
import {createAPI} from './api.js';
import {Operation as DataOperation} from './reducer/data/data.js';
import {ActionCreator, AuthorizationStatus, Operation as UserOperation} from './reducer/user/user.js';


const onError = (err) => {
  notify.show(err, `error`);
  store.dispatch(ActionCreator.catchError(err));
};

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
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

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer.js';
import thunk from 'redux-thunk';
import {createAPI} from './api.js';
import {Operation as DataOperation} from './reducer/data/data.js';
import {ActionCreator} from './reducer/app/app.js';

const onError = (err) => {
  store.dispatch(ActionCreator.catchError(err));
};

const api = createAPI(onError);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(DataOperation.loadPlaces());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);

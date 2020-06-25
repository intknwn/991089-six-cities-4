import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {Settings} from "./const.js";
import {offers} from './mocks/offers.js';

ReactDOM.render(
    <App
      places={offers}
      placesCount={Settings.PLACES}
    />,
    document.querySelector(`#root`)
);

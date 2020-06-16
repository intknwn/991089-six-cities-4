import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {PROPERTY_NAMES, Settings} from "./const.js";

ReactDOM.render(
    <App propertyNames={PROPERTY_NAMES} placesCount={Settings.PLACES}/>,
    document.querySelector(`#root`)
);

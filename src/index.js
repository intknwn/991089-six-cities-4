import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const Settings = {
  PLACES: 256,
};

const PROPERTY_NAMES = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`
];

ReactDOM.render(
    <App propertyNames={PROPERTY_NAMES} placesCount={Settings.PLACES}/>,
    document.querySelector(`#root`)
);

import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const App = ({propertyNames, placesCount}) => (
  <Main
    propertyNames={propertyNames}
    placesCount={placesCount}
    onCardTitleClick={() => {}}
  />
);

App.propTypes = {
  propertyNames: PropTypes.arrayOf(PropTypes.string),
  placesCount: PropTypes.number.isRequired,
};

export default App;

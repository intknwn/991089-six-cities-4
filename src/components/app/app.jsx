import React from 'react';
import Main from '../main/main.jsx';
import Notifications, {notify} from 'react-notify-toast';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getError} from '../../reducer/app/selectors.js';

const App = ({error}) => {
  return (
    <React.Fragment>
      <Notifications />
      {error && notify.show(error, `error`)}
      <Main
        onCardTitleClick={() => {}}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  error: getError(state)
});

App.propTypes = {
  error: PropTypes.string,
};

export default connect(mapStateToProps, null)(App);

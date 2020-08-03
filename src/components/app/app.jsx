import React from 'react';
import Main from '../main/main.jsx';
import Notifications from 'react-notify-toast';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {getScreen} from "../../reducer/app/selectors.js";
import {Screen} from '../../const.js';
import SignIn from '../sign-in/sign-in.jsx';

const App = ({screen, onSubmit}) => {
  return (
    <React.Fragment>
      <Notifications />
      {screen === Screen.MAIN ?
        <Main
          onCardTitleClick={() => {}}
        /> :
        <SignIn onSubmit={onSubmit} />}
    </React.Fragment>
  );
};

App.propTypes = {
  screen: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  screen: getScreen(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData) {
    dispatch(UserOperation.login(authData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

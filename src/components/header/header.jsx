import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, userPropTypes} from '../../const.js';

const Header = ({user}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.ROOT}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
                  <div
                    style={user ? {
                      backgroundImage: user.avatar_url && `url(https://4.react.pages.academy/six-cities${user.avatar_url})`,
                    } : {}}
                    className="header__avatar-wrapper user__avatar-wrapper"
                  >
                  </div>
                  <span className="header__user-name user__name">{user ? user.email : `Sign In`}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: userPropTypes,
};

export default Header;

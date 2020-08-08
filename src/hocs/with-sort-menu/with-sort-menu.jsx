import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {SortType} from '../../const';
import {ActionCreator} from '../../reducer/data/data.js';


const withSortMenu = (Component) => {
  class WithSortMenu extends React.PureComponent {

    constructor(props) {
      super(props);

      this._sortListRef = React.createRef();

      this.state = {
        isHidden: true,
        sortType: SortType.POPULAR
      };

      this._hideMenu = this._hideMenu.bind(this);
      this._handleOnMenuClick = this._handleOnMenuClick.bind(this);
      this._handleOnSortClick = this._handleOnSortClick.bind(this);
      this._handleOutsideClick = this._handleOutsideClick.bind(this);
    }

    componentDidMount() {
      document.addEventListener(`mousedown`, this._handleOutsideClick);
    }

    componentWillUnmount() {
      document.removeEventListener(`mousedown`, this._handleOutsideClick);
    }

    _hideMenu() {
      this.setState({
        isHidden: true
      });
    }

    _handleOnMenuClick() {
      this.setState((prevState) => {
        return {
          isHidden: !prevState.isHidden
        };
      });
    }

    _handleOnSortClick(sortType) {
      const {onSortClick} = this.props;
      this._hideMenu();
      onSortClick(sortType);
      this.setState({
        sortType
      });
    }

    _handleOutsideClick(evt) {
      if (this._sortListRef && !this._sortListRef.current.contains(evt.target) && !this.state.isHidden) {
        this.setState({
          isHidden: true
        });
      }
    }

    render() {
      const {isHidden, sortType} = this.state;
      return (
        <Component
          {...this.props}
          listRef={this._sortListRef}
          isHidden={isHidden}
          sortType={sortType}
          onMenuClick={this._handleOnMenuClick}
          onSortClick={this._handleOnSortClick}
        />
      );
    }
  }

  WithSortMenu.propTypes = {
    onSortClick: PropTypes.func.isRequired,
  };

  return WithSortMenu;
};

const mapDispatchToProps = (dispatch) => ({
  onSortClick(sortType) {
    dispatch(ActionCreator.setSortType(sortType));
  }
});

const composedWithSortMenu = compose(
    connect(null, mapDispatchToProps),
    withSortMenu
);

export {withSortMenu};
export default composedWithSortMenu;

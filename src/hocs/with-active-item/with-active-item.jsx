import React from "react";
import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null,
      };

      this.handleActiveItemSet = this.handleActiveItemSet.bind(this);
    }

    handleActiveItemSet(activeItem) {
      this.setState({
        activeItem,
      });
    }

    render() {
      const {onActiveItemSet = () => {}} = this.props;

      return (
        <Component
          {...this.props}
          onActiveItemSet={(activeItem) => {
            this.handleActiveItemSet(activeItem);
            onActiveItemSet(activeItem);
          }
          }
        />
      );
    }

  }

  WithActiveItem.propTypes = {
    onActiveItemSet: PropTypes.func,
  };

  return WithActiveItem;
};

export default withActiveItem;

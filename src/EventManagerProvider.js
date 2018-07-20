import React, { Component } from 'react';
import PropTypes from 'prop-types';
import manager from './EventManager';

class EventManagerProvider extends Component {

  static childContextTypes = {
    eventManager: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      eventManager: this.props.manager || manager,
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }

}

export default EventManagerProvider;

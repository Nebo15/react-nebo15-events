import React, { Component } from 'react';
import PropTypes from 'prop-types';
import globalManager from './EventManager';

export default class EventTrack extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.object,
    extendOptions: PropTypes.bool,
    event: PropTypes.string,
  };

  static contextTypes = {
    eventManager: PropTypes.object,
    eventOptions: PropTypes.object,
  };

  track() {
    const options = this.props.extendOptions === false ? this.props.options :
      Object.assign({}, this.context.eventOptions || {}, this.props.options);
    (this.context.eventManager || globalManager).track(this.props.name, options);
  }

  render() {
    const eventName = this.props.event || 'onClick';
    const wrap = this.props.wrap || false;

    const options = {
      [eventName]: (e) => {
        this.track();
        return this.props.children &&
          this.props.children.props &&
          this.props.children.props[eventName] &&
          typeof this.props.children.props[eventName] === 'function' &&
          this.props.children.props[eventName](e);
      },
    };

    return wrap
      ? React.createElement(wrap, options, this.props.children)
      : React.cloneElement(this.props.children, options);
  }
}

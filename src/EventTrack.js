import React, { Component, PropTypes } from 'react';
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

    return React.cloneElement(this.props.children, {
      [eventName]: (e) => {
        this.track();
        return this.props.children &&
          this.props.children.props &&
          this.props.children.props[eventName] &&
          typeof this.props.children.props[eventName] === 'function' &&
          this.props.children.props[eventName](e);
      },
    });
  }
}

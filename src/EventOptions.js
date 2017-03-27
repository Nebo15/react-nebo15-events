import React, {Component, PropTypes} from 'react';

export default class EventOptions extends Component {

  static propTypes = {
    options: PropTypes.object,
  };

  static contextTypes = {
    eventOptions: PropTypes.object,
  };

  static childContextTypes = {
    eventOptions: PropTypes.object,
  };

  getChildContext() {
    return {
      eventOptions: Object.assign({}, this.context.eventOptions, this.props.options),
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

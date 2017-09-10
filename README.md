# React Events

[![Greenkeeper badge](https://badges.greenkeeper.io/Nebo15/react-nebo15-events.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/Nebo15/react-nebo15-events.svg?branch=master)](https://travis-ci.org/Nebo15/react-nebo15-events)

Event Manager for React JS application.

### Installation

```
npm install react-nebo15-events --save
```

### Usage

```
import React from 'react';
import { EventManager } from 'react-nebo15-events';
import { render } from 'react-dom';

const eventManager = new EventManager();

eventManager.subscribe([
  'Event #1',
  'Event #2',
  'Event #3',
], (name, options) => {
  console.log('event', name, options);
});

render(<EventManagerProvider manager={eventManager}>
  {...application}
</EventManagerProvider>, document.getElementById('root'));


// Some component

class App extends React.Component {
  render() {
    return (
      <EventOptions options={{ component: 'app' }}>
        <EventTrack name="Event #1">
          <button>Click me</button>
        </EventTrack>
      </EventOptions>
    );
  }
}

// Click on button invokes event `Event #1` with options { component: 'app' }.

// You can also use EventManager via context `eventManager`

class MyPopup extends React.Component {
  static contextTypes = {
    eventManager: React.PropTypes.object.isRequired,
  };
  componentDidMount {
    this.eventManager.track('MyPopup Appeared');
  }
  render() {
    return (
      <div>My popup</div>
    );
  }
}

```

### EventManager

Manager of subscriptions for events.

#### Methods

- track
- subscribe
- register
- subscribeAll
- unsubscribeAll

### EventManagerProvider

#### Properties

- manager (default: global manager)

### EventTrack

Event track component

#### Properties

| Name | Type | Default value | Description |
| - | - | - | - |
| name | `string` | - | Event name |
| event | `string` | `onClick` | Name of the event handler. According to this doc: https://facebook.github.io/react/docs/events.html | 
| options | `object` | - | Options, what will sended to the eventManager then event fires. |
| extendOptions | `boolean` | `true` | Extend or replace the options from parent `EventOptions` | 
| wrap | `string` or `React.Element` | - | Wrapping element. Can be useful when EventTrack can't set the event handler to the element (eg. you use `recompose/pure`) or if you have few child components. |

### EventOptions

#### Properties

- options

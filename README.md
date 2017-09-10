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

HOC component that defines the context for the children elements in React application. All inherit elements will have the context `eventManager` 

#### Properties

| Name | Type | Default value | Description | 
| - | - | - | - |
| manager | `EventManager` | global event manager | EventManager that will manage the subscription and handle the events from the children of this EventManagerProvider |

#### Contextes

`EventManagerProvider` defines the context `eventManager` to pass the instance of `EventManager` to the instances of `EventTrack` and `EventOptions`.

| Name | Type | Description |
| - | - | - |
| eventManager | `EventManager` | EventManager passed as a prop `manager` in `EventManagerProvider` or default the global EventManager |

### EventTrack

Event track component. Using `EventTrack`, you can define the events in your application. `EventTrack` add the event listener to your element and fire the event in the EventManager. 

#### Properties

| Name | Type | Default value | Description |
| - | - | - | - |
| name | `string` | - | Event name |
| event | `string` | `onClick` | Name of the event handler. According to this doc: https://facebook.github.io/react/docs/events.html | 
| options | `object` | - | Options, what will sended to the eventManager then event fires. |
| extendOptions | `boolean` | `true` | Extend or replace the options from parent `EventOptions` | 
| wrap | `string` or `React.Element` | - | Wrapping element. Can be useful when EventTrack can't set the event handler to the element (eg. you use `recompose/pure`) or if you have few child components. |

### EventOptions

`EventOptions` can be useful if you want to pass the options to all child EventTrack components. eg. You want to know the name of the component there the EventTrack was fired.

```
<EventOptions options={{ component: 'header' }}>
  <header>
    <EventTrack name="Logo Click">
     <img src="images/logo.png" />
    </EventTrack>
    <Navigation />
  </header>
</EventOptions>
```

According to this example, when `Logo Click` will fire, it will be received in the `EventManager` with options `{component: 'header' }`. If Navigation has its own `EventTrack`s, they also will be fired with the `component: 'header'` in the options. 
(only if `EventTrack.extendsOptions` is not set to `false`)

#### Properties

| Name | Type | Default value | Description |
| - | - | - | - |
| options | `object` | - | Options will be used during firing the event in the inherit `EventTrack` components |

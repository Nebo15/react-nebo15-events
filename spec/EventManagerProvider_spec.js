import React from 'react';
import TestUtils from 'react-addons-test-utils';

import EventManagerProvider from '../src/EventManagerProvider'
import EventTrack from '../src/EventTrack'
import {EventManager} from '../src/EventManager'

describe('EventManagerProvider', function () {

  let manager,
    elemWithProvider;
  beforeEach(function () {
    manager = new EventManager();
    elemWithProvider = (
      <EventManagerProvider manager={manager}>
        <EventTrack name="example">
          <div className="test"></div>
        </EventTrack>
      </EventManagerProvider>
    );
    spyOn(manager, 'track');
  });

  it('should provide access to eventManager via context object', function () {

    const elem = TestUtils.renderIntoDocument(elemWithProvider);

    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(elem, 'div'));
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(elem, 'div'));

    expect(manager.track.calls.count()).toEqual(2);
  });

  it('should not change the dom', function () {

    let renderer = TestUtils.createRenderer();

    renderer.render(<EventManagerProvider manager={manager}>
      <div className="test"></div>
    </EventManagerProvider>);

    let output = renderer.getRenderOutput();

    expect(output.props.className).toEqual('test');
    expect(output.type).toEqual('div');

  })

});

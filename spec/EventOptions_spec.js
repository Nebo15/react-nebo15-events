import React from 'react';
import TestUtils from 'react-addons-test-utils';

import EventTrack from '../src/EventTrack'
import EventManager from '../src/EventManager'
import EventOptions from '../src/EventOptions'

describe('EventOptions', function () {


  it('should pass options to the EventTrack options', function (cb) {

    const test = {test: true},
      test2 = {test2: true, a: 'a'},
      test3 = {test2: false};

    let elem = TestUtils.renderIntoDocument(
      <EventOptions options={test}>
        <EventOptions options={test2}>
          <EventTrack name="test" options={test3}>
            <div>Test object</div>
          </EventTrack>
        </EventOptions>
      </EventOptions>
    );

    EventManager.subscribe('test', function (name, options) {
      expect(options).toEqual(Object.assign({}, test, test2, test3));
      cb();
    });

    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(elem, 'div'));
  })

});

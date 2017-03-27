import React from 'react';
import TestUtils from 'react-addons-test-utils';

import EventTrack from '../src/EventTrack';
import globalManager, {EventManager} from '../src/EventManager'
import EventOptions from '../src/EventOptions';
import EventManagerProvider from '../src/EventManagerProvider';

require('jasmine-expect-jsx');

describe('EventTrack', function () {

  let shallowRenderer, manager;
  beforeEach(function () {
    shallowRenderer = TestUtils.createRenderer();
    manager = new EventManager();
  });

  it('should not change a dom', function () {

    shallowRenderer.render(
      <EventTrack name="somestring">
        <div>Original DOM</div>
      </EventTrack>
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output.type).toEqual('div');
    expect(output.props.children).toEqual('Original DOM');

  });

  it('should add event action', function () {

    const elem = TestUtils.renderIntoDocument(
      <EventTrack name="somestring">
        <div>Original DOM</div>
      </EventTrack>
    );

    spyOn(globalManager, 'track');

    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(elem, 'div'));
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(elem, 'div'));
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(elem, 'div'));

    expect(globalManager.track.calls.count()).toEqual(3);
  });

  it('should not overwrite existing event', function () {

    let obj = {
      cb: function () {
      }
    };

    spyOn(obj, 'cb');
    spyOn(globalManager, 'track');

    const elem = TestUtils.renderIntoDocument(
      <EventTrack name="somestring">
        <div onClick={obj.cb}>Original DOM</div>
      </EventTrack>
    );

    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(elem, 'div'));
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(elem, 'div'));
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(elem, 'div'));

    expect(obj.cb.calls.count()).toEqual(3);
    expect(globalManager.track.calls.count()).toEqual(3);
  });

  it('should support custom events', function () {

    const elem = TestUtils.renderIntoDocument(
      <EventTrack name="somestring" event="onChange">
        <div>Original DOM</div>
      </EventTrack>
    );

    spyOn(globalManager, 'track');

    TestUtils.Simulate.change(TestUtils.findRenderedDOMComponentWithTag(elem, 'div'));
    TestUtils.Simulate.change(TestUtils.findRenderedDOMComponentWithTag(elem, 'div'));

    expect(globalManager.track.calls.count()).toEqual(2);
  });

  describe('props: options', function () {

    let options, elem, elemDiv;
    beforeEach(function () {
      options = {
        some: 'a'
      };

      elem = TestUtils.renderIntoDocument(
        <EventTrack name="somestring" options={options}>
          <div className="find">Original DOM</div>
        </EventTrack>
      );
      elemDiv = TestUtils.findRenderedDOMComponentWithTag(elem, 'div');
    });

    it('should support options property', function () {

      spyOn(globalManager, 'track');
      TestUtils.Simulate.click(elemDiv);

      expect(globalManager.track.calls.argsFor(0)).toEqual(['somestring', options]);
    })
  });

  describe('props: extendOptions', function () {

    it('should extend options by default', function () {
      let test = {test: 'a', b: 'c'},
        test2 = {test: 'b'};

      let elem = TestUtils.renderIntoDocument(
        <EventOptions options={test}>
          <EventTrack name="test" options={test2} extendOptions={true}>
            <div>Original DOM</div>
          </EventTrack>
        </EventOptions>
      );

      spyOn(globalManager, 'track');

      TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(elem, 'div'));
      expect(globalManager.track.calls.argsFor(0)).toEqual(['test', Object.assign({}, test, test2)]);
    });

    it('should support disabling extend options', function () {
      const test = {test: 'a', b: 'c'},
        test2 = {test: 'b'};

      let elem = TestUtils.renderIntoDocument(
        <EventOptions options={test}>
          <EventTrack name="test" options={test2} extendOptions={false}>
            <div>Original DOM</div>
          </EventTrack>
        </EventOptions>
      );

      spyOn(globalManager, 'track');

      TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(elem, 'div'));

      expect(globalManager.track.calls.argsFor(0)).toEqual(['test', test2]);
    })
  })

});

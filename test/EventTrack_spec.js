import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { shallow, mount } from 'enzyme';

import EventTrack from '../src/EventTrack';
import globalManager from '../src/EventManager';
import EventOptions from '../src/EventOptions';

chai.use(spies);

describe('EventTrack', () => {
  it('should not change a dom', () => {
    const children = <div>Original DOM</div>;
    const wrapper = shallow(<EventTrack name="somestring">
      {children}
    </EventTrack>);
    expect(wrapper.containsMatchingElement(children)).to.equal(true);
  });
  it('should add event action', () => {
    const children = <div>Original DOM</div>;
    const wrapper = shallow(<EventTrack name="somestring">
      { children }
    </EventTrack>);

    chai.spy.on(globalManager, 'track');

    wrapper.find('div').simulate('click');
    wrapper.find('div').simulate('click');
    wrapper.find('div').simulate('click');

    expect(globalManager.track).to.have.been.called.exactly(3);
  });
  it('should not overwrite existing event', () => {
    const obj = {
      cb() {}
    };

    chai.spy.on(obj, 'cb');
    chai.spy.on(globalManager, 'track');

    const elem = shallow(
      <EventTrack name="should not overwrite existing event">
        <div onClick={obj.cb}>Original DOM</div>
      </EventTrack>
    );

    elem.find('div').simulate('click');
    elem.find('div').simulate('click');
    elem.find('div').simulate('click');

    expect(obj.cb).to.have.been.called.exactly(3);
    expect(globalManager.track).to.have.been.called.exactly(3);
  });
  it('should support custom events', () => {
    const elem = shallow(
      <EventTrack name="should support custom events" event="onChange">
        <div>Original DOM</div>
      </EventTrack>
    );

    chai.spy.on(globalManager, 'track');

    elem.find('div').simulate('change');
    elem.find('div').simulate('change');

    expect(globalManager.track).to.have.been.called.exactly(2);
  });
  describe('props: options', () => {
    it('should support options property', () => {
      const options = {
        some: 'a'
      };
      const elem = shallow(
        <EventTrack name="should support options property" options={options}>
          <div className="find">Original DOM</div>
        </EventTrack>
      );
      chai.spy.on(globalManager, 'track');

      elem.find('div').simulate('click');

      expect(globalManager.track).to.have.been.called.with('should support options property', options);
    });
  });

  describe('props: extendOptions', () => {
    it('should extend options by default', () => {
      const test = { test: 'a', b: 'c' };
      const test2 = { test: 'b' };

      const elem = mount(
        <EventOptions options={test}>
          <EventTrack name="should extend options by default" options={test2} extendOptions>
            <div>Original DOM</div>
          </EventTrack>
        </EventOptions>
      );

      chai.spy.on(globalManager, 'track');

      elem.find('div').simulate('click');
      expect(globalManager.track).to.have.been.called.with('should extend options by default', { ...test, ...test2 });
    });

    it('should support disabling extend options', () => {
      const test = { test: 'a', b: 'c' };
      const test2 = { test: 'b' };

      const elem = mount(
        <EventOptions options={test}>
          <EventTrack name="test disabling extend options" options={test2} extendOptions={false}>
            <div>Original DOM</div>
          </EventTrack>
        </EventOptions>
      );

      chai.spy.on(globalManager, 'track');
      elem.find('div').simulate('click');
      expect(globalManager.track).to.have.been.called.with('test disabling extend options', test2);
    });
  });
});

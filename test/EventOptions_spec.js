import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { mount } from 'enzyme';

import EventTrack from '../src/EventTrack';
import globalManager from '../src/EventManager';
import EventOptions from '../src/EventOptions';

chai.use(spies);

describe('EventOptions', () => {
  it('should pass options to the EventTrack options', (cb) => {
    const test = { test: true };
    const test2 = { test2: true, a: 'a' };
    const test3 = { test2: false };

    const elem = mount(
      <EventOptions options={test}>
        <EventOptions options={test2}>
          <EventTrack name="test" options={test3}>
            <div>Test object</div>
          </EventTrack>
        </EventOptions>
      </EventOptions>
    );

    globalManager.subscribe('test', (name, options) => {
      expect(options).to.eql(Object.assign({}, test, test2, test3));
      cb();
    });

    elem.find('div').simulate('click');
  });
});

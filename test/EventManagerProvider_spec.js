import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { shallow, mount } from 'enzyme';

import EventManagerProvider from '../src/EventManagerProvider';
import EventTrack from '../src/EventTrack';
import globalManager, { EventManager } from '../src/EventManager';

chai.use(spies);

describe('EventManagerProvider', () => {
  it('should provide access to eventManager via context object', () => {
    const manager = new EventManager();
    const elem = mount(<EventManagerProvider manager={manager}>
      <EventTrack name="should provide access to eventManager via context object">
        <div className="test" />
      </EventTrack>
    </EventManagerProvider>);

    chai.spy.on(manager, 'track');
    chai.spy.on(globalManager, 'track');

    elem.find('div').first().simulate('click');
    elem.find('div').first().simulate('click');

    expect(manager.track).to.have.been.called.exactly(2);
    expect(globalManager.track).to.have.been.called.exactly(0);
  });

  it('should not change the dom', () => {
    const manager = new EventManager();
    const elem = shallow(<EventManagerProvider manager={manager}>
      <div className="test" />
    </EventManagerProvider>);

    expect(elem.containsMatchingElement(<div className="test" />)).to.be.true;
  });
});

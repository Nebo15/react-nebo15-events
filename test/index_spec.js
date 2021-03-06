import { expect } from 'chai';
import manager, { EventManager, EventTrack, EventOptions, EventManagerProvider } from '../src/index';

describe('index', () => {
  it('should return components', () => {
    expect(manager).to.be.ok;
    expect(EventManager).to.be.ok;
    expect(EventManagerProvider).to.be.ok;
    expect(EventTrack).to.be.ok;
    expect(EventOptions).to.be.ok;
  });
});

import chai, { expect } from 'chai';
import spies from 'chai-spies';

import { EventManager } from '../src/EventManager';

chai.use(spies);

describe('EventManager', () => {
  let manager;
  let spy;

  beforeEach(() => {
    manager = new EventManager();
    spy = chai.spy();
  });

  describe('subscribe', () => {
    it('should exist', () => {
      expect(manager.subscribe).to.be.ok;
    });

    it('should call callback when event is happened', () => {
      manager.subscribe('test', spy);

      expect(manager.handlers.test[0]).to.equal(spy);

      manager.track('test');
      manager.track('test');

      expect(spy).to.have.been.called.exactly(2);

      manager.unsubscribe('test', spy);

      expect(manager.handlers.test).to.eql([]);
    });

    it('should support array of events', () => {
      manager.subscribe(['test1', 'test2'], spy);
      expect(manager.handlers.test1[0]).to.equal(spy);
      expect(manager.handlers.test2[0]).to.equal(spy);

      manager.track('test1');
      manager.track('test2');

      expect(spy).to.have.been.called.exactly(2);

      manager.unsubscribe('test1', spy);

      manager.track('test1');

      expect(spy).to.have.been.called.exactly(2);
    });

    it('should pass event name as argument', () => {
      function cb(name) {
        expect(name).to.equal('test');
      }

      manager.subscribe('test', cb);
      manager.track('test');
    });

    it('should support passing options', () => {
      function cb(name, options) {
        expect(options).to.eql({ a: 1 });
      }

      manager.subscribe('test', cb);
      manager.track('test', { a: 1 });
    });
  });

  describe('register', () => {
    beforeEach(() => {
      manager.register({
        a: 1,
        b: 2
      });
    });

    it('should pass global options to cb', () => {
      function cb(name, options) {
        expect(options).to.eql({
          a: 1,
          b: 2
        });
      }

      manager.subscribe('test', cb);
      manager.track('test');
    });

    it('should assign options to global', () => {
      function cb(name, options) {
        expect(options).to.eql({
          a: 1,
          b: 3,
          c: 2
        });
      }

      manager.subscribe('test', cb);
      manager.track('test', {
        b: 3,
        c: 2
      });
    });
  });

  describe('subscribeAll', () => {
    it('should subscribe All', () => {
      manager.subscribeAll(spy);
      manager.track('test');
      manager.track('test2');

      expect(spy).to.have.been.called.exactly(2);
    });
  });

  describe('unsubscribeAll', () => {
    it('should unsubscribe all', () => {
      manager.subscribeAll(spy);
      manager.track('test');
      manager.track('test2');
      manager.unsubscribeAll(spy);
      manager.track('test2');
      expect(spy).to.have.been.called.exactly(2);
    });
  });
});

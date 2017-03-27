import {EventManager} from '../src/EventManager'

describe('EventManager', function () {

  var manager,
    obj;
  beforeEach(function () {
    manager = new EventManager();

    obj = {
      cb: function () {
      }
    };
    spyOn(obj, 'cb');
  });

  describe('subscribe', function () {

    it('should exist', function () {
      expect(manager.subscribe).toBeDefined();
    });

    it('should call callback when event is happened', function () {

      manager.subscribe('test', obj.cb);

      expect(manager.handlers['test'][0]).toEqual(obj.cb);

      manager.track('test');
      manager.track('test');

      expect(obj.cb.calls.count()).toEqual(2);

      manager.unsubscribe('test', obj.cb);

      expect(manager.handlers['test']).toEqual([]);
    });

    it('should support array of events', function () {

      manager.subscribe(['test1', 'test2'], obj.cb);
      expect(manager.handlers['test1'][0]).toEqual(obj.cb);
      expect(manager.handlers['test2'][0]).toEqual(obj.cb);

      manager.track('test1');
      manager.track('test2');

      expect(obj.cb.calls.count()).toEqual(2);

      manager.unsubscribe('test1', obj.cb);

      manager.track('test1');

      expect(obj.cb.calls.count()).toEqual(2);
    });

    it('should pass event name as argument', function () {

      function cb(name, options) {
        expect(name).toEqual('test')
      }

      manager.subscribe('test', cb);
      manager.track('test');
    });

    it('should support passing options', function () {

      function cb(name, options) {
        expect(options).toEqual({a: 1})
      }

      manager.subscribe('test', cb);
      manager.track('test', {a: 1});
    });

  });

  describe('register', function () {

    beforeEach(function () {
      manager.register({
        a: 1,
        b: 2
      });
    });

    it('should pass global options to cb', function () {
      function cb(name, options) {
        expect(options).toEqual({
          a: 1,
          b: 2
        });
      }

      manager.subscribe('test', cb);
      manager.track('test');
    });

    it('should assign options to global', function () {

      function cb(name, options) {
        expect(options).toEqual({
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

  describe('subscribeAll', function () {

    it('should subscribe All', function () {
      manager.subscribeAll(obj.cb);
      manager.track('test');
      manager.track('test2');

      expect(obj.cb.calls.count()).toEqual(2);
    });
  });

  describe('unsubscribeAll', function () {

    it('should unsubscribe all', function () {
      manager.subscribeAll(obj.cb);
      manager.track('test');
      manager.track('test2');
      manager.unsubscribeAll(obj.cb);
      manager.track('test2');
      expect(obj.cb.calls.count()).toEqual(2);
    })

  });

});

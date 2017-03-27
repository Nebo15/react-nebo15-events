export class EventManager {
  globalOptions = {};
  handlers = {};

  $$GLOBAL_EVENT_HANDLER = '$$GLOBAL_EVENT_HANDLER';

  register(options) {
    Object.assign(this.globalOptions, options || {});
  }

  _getHandlers(name) {
    return (this.handlers[name] || []).concat(this.handlers[this.$$GLOBAL_EVENT_HANDLER] || []);
  }

  track(name, options) {
    let opts = Object.assign({}, this.globalOptions, options);

    this._getHandlers(name).forEach((item) => {
      item(name, opts);
    });
  }

  subscribe(events = [], fn) {
    if (!Array.isArray(events)) {
      events = [events];
    }
    events.forEach((item) => {
      if (!Array.isArray(this.handlers[item])) {
        this.handlers[item] = [];
      }
      this.handlers[item].push(fn);
    });

  }

  unsubscribe(events, fn) {
    if (!Array.isArray(events)) {
      events = [events];
    }
    events.forEach((item) => {
      this.handlers[item] = (this.handlers[item] || []).filter(function (item) {
        if (item !== fn) {
          return item;
        }
      });
    });
  }

  subscribeAll(fn) {
    this.subscribe(this.$$GLOBAL_EVENT_HANDLER, fn);
  }

  unsubscribeAll(fn) {
    this.unsubscribe(this.$$GLOBAL_EVENT_HANDLER, fn);
  }
}

export default new EventManager();

import manager, {EventManager, EventTrack, EventOptions, EventManagerProvider} from '../src/index';

describe('index', function () {

  it('should return components', function () {

    expect(manager).toBeDefined();
    expect(EventManager).toBeDefined();
    expect(EventManagerProvider).toBeDefined();
    expect(EventTrack).toBeDefined();
    expect(EventOptions).toBeDefined();
  });
});

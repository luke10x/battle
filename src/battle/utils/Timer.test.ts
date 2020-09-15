import { untilDiceRolled, untilFaceTurned } from './Timer';

describe('fake timers', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  test.each<any>([
    [untilDiceRolled, 1000],
    [untilFaceTurned, 100],
  ])(
    'waiting on %p takes %p ms timeout',
    (
      timedPromise: () => Promise<void>,
      timeout: number,
      done: jest.DoneCallback,
    ) => {
      const delayedAction = jest.fn(() => {
        expect(delayedAction).toHaveBeenCalled();
        done();
      });

      (async () => {
        await timedPromise();
        delayedAction();
      })();

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(
        expect.any(Function),
        timeout,
      );
      expect(delayedAction).not.toHaveBeenCalled();

      jest.runAllTimers();
    },
  );
});

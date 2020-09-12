import { barrier } from './Barrier';
describe('log', () => {
  const log = jest.fn();
  afterEach(() => jest.resetAllMocks());

  test('without barrier', async () => {
    const promise = Promise.resolve('Success').then(() => {
      log('first');
    });
    log('second');

    await promise;
    expect(log).toHaveBeenNthCalledWith(1, 'second');
    expect(log).toHaveBeenNthCalledWith(2, 'first');
  });

  test('with barrier', async () => {
    const [acquire, release] = barrier();
    const promise = Promise.resolve().then(async () => {
      log('first');
      await release();
    });
    await acquire();
    log('second');

    await promise;
    expect(log).toHaveBeenNthCalledWith(1, 'first');
    expect(log).toHaveBeenNthCalledWith(2, 'second');
  });
});

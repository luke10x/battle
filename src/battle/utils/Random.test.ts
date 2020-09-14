import { generateRandom } from './Random';
import { Face } from '../state';

test.each([
  [0, 1 as Face],
  [0.1, 1 as Face],
  [0.2, 2 as Face],
  [0.3, 2 as Face],
  [0.4, 3 as Face],
  [0.5, 4 as Face],
  [0.6, 4 as Face],
  [0.7, 5 as Face],
  [0.8, 5 as Face],
  [0.9, 6 as Face],
  [0.9999999, 6 as Face],
])(
  'when random seed is %p then random Face is %p',
  (value: number, expectedFace: Face) => {
    // const value = 0.5;
    const spy = jest.spyOn(Math, 'random').mockImplementation(() => value);
    const result = generateRandom();
    spy.mockRestore();

    expect(result).toEqual(expectedFace);
  },
);

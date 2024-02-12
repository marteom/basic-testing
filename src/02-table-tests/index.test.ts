import { simpleCalculator, Action } from './index';

interface TestData {
  a: number;
  b: number;
  action: Action;
  expected: number;
}

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 4, b: 4, action: Action.Multiply, expected: 16 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'calculate(%i, %i) should return $expected',
    ({ a, b, action, expected }: TestData) => {
      expect(
        simpleCalculator({
          a,
          b,
          action,
        }),
      ).toBe(expected);
    },
  );
});

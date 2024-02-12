import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const data = await resolveValue(222);
    expect(data).toBe(222);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    try {
      throwError('Hello');
    } catch (err: unknown) {
      expect(err).toEqual(new Error('Hello'));
    }
  });
  test('should throw error with default message if message is not provided', () => {
    try {
      throwError();
    } catch (err: unknown) {
      expect(err).toEqual(new Error('Oops!'));
    }
  });
});
new Error();

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    try {
      throwCustomError();
    } catch (err: unknown) {
      expect(err).toEqual(new MyAwesomeError());
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toEqual(new MyAwesomeError());
  });
});

import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(() => 'mocked fun'),
    mockTwo: jest.fn(() => 'mocked fun'),
    mockThree: jest.fn(() => 'mocked fun'),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  beforeEach(() => {
    jest.disableAutomock();
  });
  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleLog = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(consoleLog).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const consoleLog = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(consoleLog).toHaveBeenCalledTimes(1);
    consoleLog.mockRestore();
  });
});

import path from 'node:path';
import fs from 'node:fs';
import fsPromises from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const delay = 1000;
  
    jest.spyOn(global, 'setTimeout')
    doStuffByTimeout(callback, delay);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(callback, delay);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeoutDuration = 1000;

    doStuffByTimeout(callback, timeoutDuration);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeoutDuration);
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const intervalDuration = 1000;
    const timeoutDuration = 3000;

    doStuffByInterval(callback, intervalDuration);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeoutDuration);
    expect(callback).toBeCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const intervalDuration = 1000;
    const timeoutDuration = 3000; 

    doStuffByInterval(callback, intervalDuration);
    jest.advanceTimersByTime(timeoutDuration);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = './1.txt';
    const mockJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(mockJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = './1.txt';
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileData = 'simple file data';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(fileData);
    const res = await readFileAsynchronously('./1.txt');
    expect(res).toBe(fileData);
  });
});

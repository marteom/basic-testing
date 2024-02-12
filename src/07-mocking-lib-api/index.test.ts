import axios from 'axios';
import { throttledGetDataFromApi } from './index';

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');
    axios.Axios.prototype.get = jest.fn().mockResolvedValue('value');
    await throttledGetDataFromApi('/');
    jest.runAllTimers();
    expect(axiosSpy).toHaveBeenCalled();
  });

  test('should perform request to correct provided url', async () => {
    axios.Axios.prototype.get = jest.fn().mockResolvedValue('value');
    const axiosSpy = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi('/url');
    jest.runAllTimers();
    expect(axiosSpy).toHaveBeenCalled();
  });

  test('should return response data', async () => {
    const data = 'value';

    axios.Axios.prototype.get = jest.fn().mockResolvedValue({ data });
    const mockData = await throttledGetDataFromApi('/');
    jest.runAllTimers();
    expect(mockData).toBe(data);
  });
});

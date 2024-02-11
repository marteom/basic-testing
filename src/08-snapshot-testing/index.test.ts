import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const elements = [1];
    const linksList = {
      value: 1,
      next: {
        value: null,
        next: null,
      },
    };

    const result = generateLinkedList(elements);

    expect(result).toStrictEqual(linksList);
  });

  test('should generate linked list from values 2', () => {
    const elements = [2];
    const result = generateLinkedList(elements);

    expect(result).toMatchSnapshot();
  });
});

import { makeActionCreator } from './makeActionCreator';

describe('makeActionCreator', () => {
  it('Should throw if type is empty', () => {
    expect(() => makeActionCreator('', () => ({}))).toThrow(
      'Type must not be empty.',
    );
  });

  it('Should create an action with type', () => {
    const type = 'type';
    const actionCreator = makeActionCreator(type);
    expect(actionCreator()).toEqual({ type: type });
  });

  it('Should invoke the additional property creator if provided', () => {
    const type = 'type';

    const mockPropertyCreator = jest.fn((paramOne, paramTwo) => ({
      paramOne,
      paramTwo,
    }));

    const actionCreator = makeActionCreator(type, mockPropertyCreator);

    const paramOne = 1;
    const paramTwo = 2;
    const createdAction = actionCreator(paramOne, paramTwo);

    expect(createdAction).toEqual({ paramOne: 1, paramTwo: 2, type });

    expect(mockPropertyCreator).toHaveBeenCalledTimes(1);
    expect(mockPropertyCreator.mock.calls[0][0]).toBe(paramOne);
    expect(mockPropertyCreator.mock.calls[0][1]).toBe(paramTwo);
  });
});

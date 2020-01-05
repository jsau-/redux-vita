import { makeActionCreator } from './makeActionCreator';

describe('makeActionCreator', () => {
  it('Should throw if type is empty', () => {
    expect(() => makeActionCreator('', () => ({}))).toThrow('Type must not be empty.');
  });

  it('Should create an action with type', () => {
    const type = 'type';
    const actionCreator = makeActionCreator(type, () => ({}));
    expect(actionCreator()).toEqual({ type: type });
  });

  it('Should invoke the additional property creator function if provided', () => {
    const type = 'type';

    const mockFuncProperty = jest.fn((paramOne, paramTwo) => ({ paramOne, paramTwo }));

    const actionCreator = makeActionCreator(type, mockFuncProperty);

    const paramOne = 1;
    const paramTwo = 2;
    const createdAction = actionCreator(paramOne, paramTwo);

    expect(createdAction).toEqual({ type: type, paramOne: 1, paramTwo: 2 });

    expect(mockFuncProperty).toHaveBeenCalledTimes(1);
    expect(mockFuncProperty.mock.calls[0][0]).toBe(paramOne);
    expect(mockFuncProperty.mock.calls[0][1]).toBe(paramTwo);
  });

  it('Should throw on generating additional properties if not a plain object', () => {
    const type = 'type';

    const mockFuncProperty = jest.fn(() => ({ invalid_type: 'invalid_type' }));

    const actionCreator = makeActionCreator(type, mockFuncProperty);

    expect(() => actionCreator())
      .toThrow('Property creator function generated an invalid type. Expected plain object, got \'string\'');
  });
});

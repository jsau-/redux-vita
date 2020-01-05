import { makeActionCreator } from './makeActionCreator';

describe('makeActionCreator', () => {
  it('Should throw if type is empty', () => {
    expect(() => makeActionCreator()).toThrow('Type must not be empty.');
  });

  it('Should create an action with type', () => {
    const strType = 'type';
    const actionCreator = makeActionCreator(strType);

    expect(actionCreator()).toEqual({ type: strType });
  });

  it('Should invoke the additional property creator function if provided', () => {
    const strType = 'type';

    const mockFuncProperty = jest.fn((paramOne, paramTwo) => ({ paramOne, paramTwo }));

    const actionCreator = makeActionCreator(strType, mockFuncProperty);

    const mixedActionCreatorParamOne = 1;
    const mixedActionCreatorParamTwo = 2;
    const objCreatedAction = actionCreator(mixedActionCreatorParamOne, mixedActionCreatorParamTwo);

    expect(objCreatedAction).toEqual({ type: strType, paramOne: 1, paramTwo: 2 });

    expect(mockFuncProperty).toHaveBeenCalledTimes(1);
    expect(mockFuncProperty.mock.calls[0][0]).toBe(mixedActionCreatorParamOne);
    expect(mockFuncProperty.mock.calls[0][1]).toBe(mixedActionCreatorParamTwo);
  });

  it('Should throw on generating additional properties if not a plain object', () => {
    const strType = 'type';

    const mockFuncProperty = jest.fn(() => 'invalid_type');

    const actionCreator = makeActionCreator(strType, mockFuncProperty);

    expect(() => actionCreator())
      .toThrow('Property creator function generated an invalid type. Expected plain object, got \'string\'');
  });
});

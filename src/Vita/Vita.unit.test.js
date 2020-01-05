import Vita from '.';
import makeActionCreator from '../makeActionCreator';
import { KEY_TYPE } from '../makeActionCreator/constants';

jest.mock('../makeActionCreator', () => jest.fn());

describe('Vita', () => {
  beforeEach(() => {
    makeActionCreator.mockReset();
  });

  it('Should instantiate Vita with default params', () => {
    const vita = new Vita();
    expect(vita._objDefaultReducerState).toEqual({});
    expect(vita._mapActionCreators).toEqual(new Map());
    expect(vita._mapReducerFunctions).toEqual(new Map());
  });

  it('Should cache default reducer state on instantiating', () => {
    const objDefaultState = { default_field: true };
    const vita = new Vita(objDefaultState);

    expect(vita._objDefaultReducerState).toBe(objDefaultState);
  });

  it('Should clear all action creators', () => {
    const vita = new Vita();
    vita.registerAction('action_type', () => {});
    expect(vita._mapActionCreators.size).toEqual(1);

    vita.clearAllActionCreators();
    expect(vita._mapActionCreators.size).toEqual(0);
  });

  it('Should clear all reducers', () => {
    const vita = new Vita();
    vita.registerReducer('action_type', () => {});
    expect(vita._mapReducerFunctions.size).toEqual(1);

    vita.clearAllReducers();
    expect(vita._mapReducerFunctions.size).toEqual(0);
  });

  it('Should get a dispatchable object for registered action creator', () => {
    const strActionType = 'action_type';
    const vita = new Vita();

    const objMockReturnedAction = { [KEY_TYPE]: strActionType };
    const mockFuncActionCreator = jest.fn(() => objMockReturnedAction);
    vita.registerAction(strActionType, mockFuncActionCreator);

    const objReceivedAction = vita.action(strActionType);

    expect(objReceivedAction).toBe(objMockReturnedAction);
    expect(mockFuncActionCreator).toHaveBeenCalledTimes(1);
  });

  it('Should pass varargs to registered action creator', () => {
    const strActionType = 'action_type';
    const vita = new Vita();

    const mockFuncActionCreator = jest.fn((argone, argtwo) => ({
      [KEY_TYPE]: strActionType,
      argone: argone * 10,
      argtwo: argtwo * 20,
    }));

    vita.registerAction(strActionType, mockFuncActionCreator);

    const objReceivedAction = vita.action(strActionType, 1, 2);

    expect(objReceivedAction).toEqual({
      [KEY_TYPE]: strActionType,
      argone: 10,
      argtwo: 40,
    });

    expect(mockFuncActionCreator).toHaveBeenCalledTimes(1);
    expect(mockFuncActionCreator.mock.calls[0][0]).toBe(1);
    expect(mockFuncActionCreator.mock.calls[0][1]).toBe(2);
  });

  it('Should throw on attempting to get dispatchable object for unregistered action creator', () => {
    const vita = new Vita();

    expect(() => vita.action('action_not_found'))
      .toThrow('No action creator was registered for type \'action_not_found\'');
  });

  it('Should return empty object on reducing with no registered handler, no default state', () => {
    const vita = new Vita();
    const uobjReducedState = vita.reduce(undefined, { [KEY_TYPE]: 'action_not_found' });
    expect(uobjReducedState).toEqual({});
  });

  it('Should return default state on reducing with no registed handler', () => {
    const objDefaultState = { default_field: true };
    const vita = new Vita(objDefaultState);

    const objReducedState = vita.reduce(undefined, { [KEY_TYPE]: 'action_not_found' });
    expect(objReducedState).toBe(objDefaultState);
  });

  it('Should return current state on reducing with no registered handler', () => {
    const objDefaultState = { default_field: true };
    const objCurrentState = { current_field: true };

    const vita = new Vita(objDefaultState);
    const objReducedState = vita.reduce(objCurrentState, { [KEY_TYPE]: 'action_not_found' });

    expect(objReducedState).toBe(objCurrentState);
  });

  it('Should throw on reducing an action without a type key', () => {
    const strActionType = 'set_count';
    const objCurrentState = { count: 10, other_field: true };

    const mockFuncReducer = jest.fn((state) => state);

    const vita = new Vita();
    vita.registerReducer(strActionType, mockFuncReducer);

    expect(() => vita.reduce(objCurrentState, { count: 50 }))
      .toThrow(`Action object has no '${KEY_TYPE}' key. This is invalid.`);
  });

  it('Should return result of reducer function for registered handler', () => {
    const strActionType = 'set_count';
    const objCurrentState = { count: 10, other_field: true };

    const mockFuncReducer = jest.fn((state, action) => ({ ...state, count: action.count }));

    const vita = new Vita();
    vita.registerReducer(strActionType, mockFuncReducer);

    const objExpectedState = { count: 50, other_field: true };
    const objReducedState = vita.reduce(objCurrentState, { [KEY_TYPE]: strActionType, count: 50 });

    expect(objReducedState).toEqual(objExpectedState);
    expect(mockFuncReducer).toHaveBeenCalledTimes(1);
  });

  it('Should register an action creator', () => {
    const strActionType = 'action_type';
    const funcActionCreator = () => {};

    const vita = new Vita();

    expect(vita._mapActionCreators.size).toBe(0);

    vita.registerAction(strActionType, funcActionCreator);

    expect(vita._mapActionCreators.size).toBe(1);
    expect(vita._mapActionCreators).toEqual(new Map([[strActionType, funcActionCreator]]));
  });

  it('Should register an action creator with default creator function', () => {
    const vita = new Vita();

    expect(vita._mapActionCreators.size).toBe(0);

    vita.registerAction('action_type');

    expect(vita._mapActionCreators.size).toBe(1);
    expect(makeActionCreator).toHaveBeenCalledTimes(1);
    expect(makeActionCreator.mock.calls[0][0]).toBe('action_type');
  });

  it('Should return self on registering an action creator', () => {
    const vita = new Vita();
    const vitaReturned = vita.registerAction('action_one');
    expect(vitaReturned).toBe(vita);
  });

  it('Should register a reducer function', () => {
    const strActionType = 'action_type';
    const funcReducer = () => {};

    const vita = new Vita();

    expect(vita._mapReducerFunctions.size).toBe(0);

    vita.registerReducer(strActionType, funcReducer);

    expect(vita._mapReducerFunctions.size).toBe(1);
    expect(vita._mapReducerFunctions).toEqual(new Map([[strActionType, funcReducer]]));
  });

  it('Should register a slice', () => {
    const vita = new Vita();
    const funcActionCreator = () => {};
    const funcReducer = () => {};

    expect(vita._mapActionCreators.size).toBe(0);
    expect(vita._mapReducerFunctions.size).toBe(0);

    vita.registerSlice('action_type', funcReducer, funcActionCreator);

    expect(vita._mapActionCreators.size).toBe(1);
    expect(vita._mapReducerFunctions.size).toBe(1);
    expect(makeActionCreator).toHaveBeenCalledTimes(0);
  });

  it('Should create a default action creator on registering slice if none provided', () => {
    const vita = new Vita();
    const funcReducer = () => {};

    expect(vita._mapActionCreators.size).toBe(0);
    expect(vita._mapReducerFunctions.size).toBe(0);

    vita.registerSlice('action_type', funcReducer);

    expect(vita._mapActionCreators.size).toBe(1);
    expect(vita._mapReducerFunctions.size).toBe(1);

    expect(makeActionCreator).toHaveBeenCalledTimes(1);
    expect(makeActionCreator.mock.calls[0][0]).toBe('action_type');
  });

  it('Should return self on registering a slice', () => {
    const vita = new Vita();
    const vitaReturned = vita.registerSlice('action_type', () => {}, () => {});
    expect(vitaReturned).toBe(vita);
  });

  it('Should return self on registering an reducer', () => {
    const vita = new Vita();
    const vitaReturned = vita.registerReducer('action_one', () => {});
    expect(vitaReturned).toBe(vita);
  });

  it('Should unregister an action creator', () => {
    const vita = new Vita();

    vita.registerAction('action_one', () => {});
    vita.registerAction('action_two', () => {});

    expect(vita._mapActionCreators.size).toBe(2);

    vita.unregisterAction('action_two');
    expect(vita._mapActionCreators.size).toBe(1);

    vita.unregisterAction('action_one');
    expect(vita._mapActionCreators.size).toBe(0);
  });

  it('Should return self on unregistering an action creator', () => {
    const vita = new Vita();
    const vitaReturned = vita.unregisterAction('action_one');
    expect(vitaReturned).toBe(vita);
  });

  it('Should unregister a reducer', () => {
    const vita = new Vita();

    vita.registerReducer('action_one', () => {});
    vita.registerReducer('action_two', () => {});

    expect(vita._mapReducerFunctions.size).toBe(2);

    vita.unregisterReducer('action_one');
    expect(vita._mapReducerFunctions.size).toBe(1);

    vita.unregisterReducer('action_two');
    expect(vita._mapReducerFunctions.size).toBe(0);
  });

  it('Should return self on unregistering a reducer', () => {
    const vita = new Vita();
    const vitaReturned = vita.unregisterReducer('action_one');
    expect(vitaReturned).toBe(vita);
  });

  it('Should unregister a slice', () => {
    const vita = new Vita();
    const funcActionCreator = () => {};
    const funcReducer = () => {};

    vita.registerSlice('action_type', funcActionCreator, funcReducer);

    expect(vita._mapActionCreators.size).toBe(1);
    expect(vita._mapReducerFunctions.size).toBe(1);

    vita.unregisterSlice('action_type');

    expect(vita._mapActionCreators.size).toBe(0);
    expect(vita._mapReducerFunctions.size).toBe(0);
  });

  it('Should return self on unregistering a slice', () => {
    const vita = new Vita();
    const vitaReturned = vita.unregisterSlice('action_type');
    expect(vitaReturned).toBe(vita);
  });
});
import { Vita } from './Vita';
import { makeActionCreator } from './makeActionCreator';

jest.mock('./makeActionCreator');
const mockedActionCreator = mocked(makeActionCreator, true);

describe('Vita', () => {
  beforeEach(() => {
    mockedActionCreator.mockReset();
  });

  it('Should instantiate Vita with default params', () => {
    const vita = new Vita();
    expect(vita.defaultReducerState).toEqual({});
    expect(vita.actionCreators).toEqual(new Map());
    expect(vita.reducerFunctions).toEqual(new Map());
  });

  it('Should cache default reducer state on instantiating', () => {
    const defaultState = { defaultField: true };
    const vita = new Vita(defaultState);

    expect(vita.defaultReducerState).toBe(defaultState);
  });

  it('Should clear all action creators', () => {
    const vita = new Vita();
    vita.registerAction('action_type', () => {
      'field';
    });
    expect(vita.actionCreators.size).toEqual(1);

    vita.clearAllActionCreators();
    expect(vita.actionCreators.size).toEqual(0);
  });

  it('Should clear all reducers', () => {
    const vita = new Vita();
    vita.registerReducer('action_type', () => {
      'field';
    });
    expect(vita.reducerFunctions.size).toEqual(1);

    vita.clearAllReducers();
    expect(vita.reducerFunctions.size).toEqual(0);
  });

  it('Should get a dispatchable object for registered action creator', () => {
    const strActionType = 'action_type';
    const vita = new Vita();

    const objMockReturnedAction = { type: strActionType };
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
      argone: argone * 10,
      argtwo: argtwo * 20,
      type: strActionType,
    }));

    vita.registerAction(strActionType, mockFuncActionCreator);

    const objReceivedAction = vita.action(strActionType, 1, 2);

    expect(objReceivedAction).toEqual({
      argone: 10,
      argtwo: 40,
      type: strActionType,
    });

    expect(mockFuncActionCreator).toHaveBeenCalledTimes(1);
    expect(mockFuncActionCreator.mock.calls[0][0]).toBe(1);
    expect(mockFuncActionCreator.mock.calls[0][1]).toBe(2);
  });

  it('Should throw on dispatching unregistered action creator', () => {
    const vita = new Vita();

    expect(() => vita.action('action_not_found')).toThrow(
      "No action creator was registered for type 'action_not_found'",
    );
  });

  it('Should return empty on reducing w/ no handler, default state', () => {
    const vita = new Vita();

    const uobjReducedState = vita.reduce(undefined, {
      type: 'action_not_found',
    });

    expect(uobjReducedState).toEqual({});
  });

  it('Should return default state on reducing with no registed handler', () => {
    const defaultState = { defaultField: true };
    const vita = new Vita(defaultState);

    const objReducedState = vita.reduce(undefined, {
      type: 'action_not_found',
    });
    expect(objReducedState).toBe(defaultState);
  });

  it('Should return curr state on reducing with no registered handler', () => {
    const defaultState = { defaultField: true };
    const objCurrentState = { currentField: true };

    const vita = new Vita(defaultState);
    const objReducedState = vita.reduce(objCurrentState, {
      type: 'action_not_found',
    });

    expect(objReducedState).toBe(objCurrentState);
  });

  it('Should throw on reducing an action without a type key', () => {
    const strActionType = 'set_count';
    const objCurrentState = { count: 10, otherField: true };

    const mockFuncReducer = jest.fn(state => state);

    const vita = new Vita();
    vita.registerReducer(strActionType, mockFuncReducer);

    expect(() => vita.reduce(objCurrentState, { count: 50 })).toThrow(
      `Action object has no 'type' key. This is invalid.`,
    );
  });

  it('Should return result of reducer function for registered handler', () => {
    const strActionType = 'set_count';
    const objCurrentState = { count: 10, otherField: true };

    const mockFuncReducer = jest.fn((state, action) => ({
      ...state,
      count: action.count,
    }));

    const vita = new Vita();
    vita.registerReducer(strActionType, mockFuncReducer);

    const objExpectedState = { count: 50, otherField: true };
    const objReducedState = vita.reduce(objCurrentState, {
      count: 50,
      type: strActionType,
    });

    expect(objReducedState).toEqual(objExpectedState);
    expect(mockFuncReducer).toHaveBeenCalledTimes(1);
  });

  it('Should register an action creator', () => {
    const strActionType = 'action_type';

    const funcActionCreator = function(actionField: string): object {
      return { actionField };
    };

    const vita = new Vita();

    expect(vita.actionCreators.size).toBe(0);

    vita.registerAction(strActionType, funcActionCreator);

    expect(vita.actionCreators.size).toBe(1);
    expect(vita.actionCreators).toEqual(
      new Map([[strActionType, funcActionCreator]]),
    );
  });

  it('Should register an action creator with default creator function', () => {
    const vita = new Vita();

    expect(vita.actionCreators.size).toBe(0);

    vita.registerAction('action_type');

    expect(vita.actionCreators.size).toBe(1);
    expect(mockedActionCreator).toHaveBeenCalledTimes(1);
    expect(mockedActionCreator.mock.calls[0][0]).toBe('action_type');
  });

  it('Should return self on registering an action creator', () => {
    const vita = new Vita();
    const vitaReturned = vita.registerAction('action_one');
    expect(vitaReturned).toBe(vita);
  });

  it('Should register a reducer function', () => {
    const strActionType = 'action_type';

    const funcReducer = function(state: object): object {
      return state;
    };

    const vita = new Vita();

    expect(vita.reducerFunctions.size).toBe(0);

    vita.registerReducer(strActionType, funcReducer);

    expect(vita.reducerFunctions.size).toBe(1);
    expect(vita.reducerFunctions).toEqual(
      new Map([[strActionType, funcReducer]]),
    );
  });

  it('Should register a slice', () => {
    const vita = new Vita();

    const funcActionCreator = function(actionField: string): object {
      return { actionField };
    };

    const funcReducer = function(state: object): object {
      return state;
    };

    expect(vita.actionCreators.size).toBe(0);
    expect(vita.reducerFunctions.size).toBe(0);

    vita.registerSlice('action_type', funcReducer, funcActionCreator);

    expect(vita.actionCreators.size).toBe(1);
    expect(vita.reducerFunctions.size).toBe(1);
    expect(mockedActionCreator).toHaveBeenCalledTimes(0);
  });

  it('Should create default action creator on registering slice', () => {
    const vita = new Vita();
    const funcReducer = function(state: object): object {
      return state;
    };

    expect(vita.actionCreators.size).toBe(0);
    expect(vita.reducerFunctions.size).toBe(0);

    vita.registerSlice('action_type', funcReducer);

    expect(vita.actionCreators.size).toBe(1);
    expect(vita.reducerFunctions.size).toBe(1);

    expect(mockedActionCreator).toHaveBeenCalledTimes(1);
    expect(mockedActionCreator.mock.calls[0][0]).toBe('action_type');
  });

  it('Should return self on registering a slice', () => {
    const vita = new Vita();

    const vitaReturned = vita.registerSlice(
      'action_type',
      (state: object) => state,
      (actionField: string) => ({ actionField }),
    );

    expect(vitaReturned).toBe(vita);
  });

  it('Should return self on registering an reducer', () => {
    const vita = new Vita();

    const vitaReturned = vita.registerReducer(
      'action_one',
      (actionField: string) => ({ actionField }),
    );

    expect(vitaReturned).toBe(vita);
  });

  it('Should unregister an action creator', () => {
    const vita = new Vita();

    vita.registerAction('action_one', function(actionField: string) {
      return { actionField };
    });

    vita.registerAction('action_two', function(actionField: string) {
      return { actionField };
    });

    expect(vita.actionCreators.size).toBe(2);

    vita.unregisterAction('action_two');
    expect(vita.actionCreators.size).toBe(1);

    vita.unregisterAction('action_one');
    expect(vita.actionCreators.size).toBe(0);
  });

  it('Should return self on unregistering an action creator', () => {
    const vita = new Vita();
    const vitaReturned = vita.unregisterAction('action_one');
    expect(vitaReturned).toBe(vita);
  });

  it('Should unregister a reducer', () => {
    const vita = new Vita();

    vita.registerReducer('action_one', (state: object) => state);
    vita.registerReducer('action_two', (state: object) => state);

    expect(vita.reducerFunctions.size).toBe(2);

    vita.unregisterReducer('action_one');
    expect(vita.reducerFunctions.size).toBe(1);

    vita.unregisterReducer('action_two');
    expect(vita.reducerFunctions.size).toBe(0);
  });

  it('Should return self on unregistering a reducer', () => {
    const vita = new Vita();
    const vitaReturned = vita.unregisterReducer('action_one');
    expect(vitaReturned).toBe(vita);
  });

  it('Should unregister a slice', () => {
    const vita = new Vita();

    const funcActionCreator = function(actionField: string): object {
      return { actionField };
    };

    const funcReducer = function(state: object): object {
      return state;
    };

    vita.registerSlice('action_type', funcActionCreator, funcReducer);

    expect(vita.actionCreators.size).toBe(1);
    expect(vita.reducerFunctions.size).toBe(1);

    vita.unregisterSlice('action_type');

    expect(vita.actionCreators.size).toBe(0);
    expect(vita.reducerFunctions.size).toBe(0);
  });

  it('Should return self on unregistering a slice', () => {
    const vita = new Vita();
    const vitaReturned = vita.unregisterSlice('action_type');
    expect(vitaReturned).toBe(vita);
  });
});

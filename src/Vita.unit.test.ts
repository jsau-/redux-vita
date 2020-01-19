import { mocked } from 'ts-jest/utils';
import { Vita } from './Vita';
import { makeActionCreator } from './makeActionCreator';

jest.mock('./makeActionCreator');
const mockedActionCreator = mocked(makeActionCreator, true);

describe('Vita', () => {
  it('Should instantiate Vita with default params', () => {
    const vita = new Vita();
    expect(vita['defaultReducerState']).toEqual({});
    expect(vita['actionCreators']).toEqual(new Map());
    expect(vita['reducerFunctions']).toEqual(new Map());
  });

  it('Should cache default reducer state on instantiating', () => {
    const defaultState = { defaultField: true };
    const vita = new Vita(defaultState);

    expect(vita['defaultReducerState']).toBe(defaultState);
  });

  it('Should clear all action creators', () => {
    const vita = new Vita();
    vita.registerAction('action_type', () => {
      'field';
    });
    expect(vita['actionCreators'].size).toEqual(1);

    vita.clearAllActionCreators();
    expect(vita['actionCreators'].size).toEqual(0);
  });

  it('Should clear all reducers', () => {
    const vita = new Vita();
    vita.registerReducer('action_type', () => {
      'field';
    });
    expect(vita['reducerFunctions'].size).toEqual(1);

    vita.clearAllReducers();
    expect(vita['reducerFunctions'].size).toEqual(0);
  });

  it('Should get a dispatchable object for registered action creator', () => {
    const actionType = 'action_type';
    const vita = new Vita();

    const mockReturnedAction = { type: actionType };
    const mockActionCreator = jest.fn(() => mockReturnedAction);
    vita.registerAction(actionType, mockActionCreator);

    const receivedAction = vita.action(actionType);

    expect(receivedAction).toBe(mockReturnedAction);
    expect(mockActionCreator).toHaveBeenCalledTimes(1);
  });

  it('Should pass varargs to registered action creator', () => {
    const actionType = 'action_type';
    const vita = new Vita();

    const mockActionCreator = jest.fn((argone, argtwo) => ({
      argone: argone * 10,
      argtwo: argtwo * 20,
      type: actionType,
    }));

    vita.registerAction(actionType, mockActionCreator);

    const receivedAction = vita.action(actionType, 1, 2);

    expect(receivedAction).toEqual({
      argone: 10,
      argtwo: 40,
      type: actionType,
    });

    expect(mockActionCreator).toHaveBeenCalledTimes(1);
    expect(mockActionCreator.mock.calls[0][0]).toBe(1);
    expect(mockActionCreator.mock.calls[0][1]).toBe(2);
  });

  it('Should throw on dispatching unregistered action creator', () => {
    const vita = new Vita();

    expect(() => vita.action('action_not_found')).toThrow(
      "No action creator was registered for type 'action_not_found'",
    );
  });

  it('Should return empty on reducing w/ no handler, default state', () => {
    const vita = new Vita();

    const reducedState = vita.reduce(undefined, {
      type: 'action_not_found',
    });

    expect(reducedState).toEqual({});
  });

  it('Should return default state on reducing with no registed handler', () => {
    const defaultState = { defaultField: true };
    const vita = new Vita(defaultState);

    const reducedState = vita.reduce(undefined, {
      type: 'action_not_found',
    });
    expect(reducedState).toBe(defaultState);
  });

  it('Should return curr state on reducing with no registered handler', () => {
    const defaultState = { defaultField: true };
    const currentState = { currentField: true };

    const vita = new Vita(defaultState);
    const reducedState = vita.reduce(currentState, {
      type: 'action_not_found',
    });

    expect(reducedState).toBe(currentState);
  });

  it('Should return result of reducer function for registered handler', () => {
    const actionType = 'set_count';
    const currentState = { count: 10, otherField: true };

    const mockReducer = jest.fn((state, action) => ({
      ...state,
      count: action.count,
    }));

    const vita = new Vita();
    vita.registerReducer(actionType, mockReducer);

    const expectedState = { count: 50, otherField: true };

    const reducedState = vita.reduce(currentState, {
      count: 50,
      type: actionType,
    });

    expect(reducedState).toEqual(expectedState);
    expect(mockReducer).toHaveBeenCalledTimes(1);
  });

  it('Should register an action creator', () => {
    const actionType = 'action_type';

    const actionCreator = function(actionField: string): object {
      return { actionField };
    };

    const vita = new Vita();

    expect(vita['actionCreators'].size).toBe(0);

    vita.registerAction(actionType, actionCreator);

    expect(vita['actionCreators'].size).toBe(1);
    expect(vita['actionCreators']).toEqual(
      new Map([[actionType, actionCreator]]),
    );
  });

  it('Should register an action creator with default creator function', () => {
    const vita = new Vita();

    expect(vita['actionCreators'].size).toBe(0);

    vita.registerAction('action_type');

    expect(vita['actionCreators'].size).toBe(1);
    expect(mockedActionCreator).toHaveBeenCalledTimes(1);
    expect(mockedActionCreator.mock.calls[0][0]).toBe('action_type');
  });

  it('Should return self on registering an action creator', () => {
    const vita = new Vita();
    const vitaReturned = vita.registerAction('action_one');
    expect(vitaReturned).toBe(vita);
  });

  it('Should register a reducer function', () => {
    const actionType = 'action_type';

    const reducer = function(state: object): object {
      return state;
    };

    const vita = new Vita();

    expect(vita['reducerFunctions'].size).toBe(0);

    vita.registerReducer(actionType, reducer);

    expect(vita['reducerFunctions'].size).toBe(1);

    expect(vita['reducerFunctions']).toEqual(new Map([[actionType, reducer]]));
  });

  it('Should register a slice', () => {
    const vita = new Vita();

    const actionCreator = function(actionField: string): object {
      return { actionField };
    };

    const reducer = function(state: object): object {
      return state;
    };

    expect(vita['actionCreators'].size).toBe(0);
    expect(vita['reducerFunctions'].size).toBe(0);

    vita.registerSlice('action_type', reducer, actionCreator);

    expect(vita['actionCreators'].size).toBe(1);
    expect(vita['reducerFunctions'].size).toBe(1);
    expect(mockedActionCreator).toHaveBeenCalledTimes(0);
  });

  it('Should create default action creator on registering slice', () => {
    const vita = new Vita();
    const reducer = function(state: object): object {
      return state;
    };

    expect(vita['actionCreators'].size).toBe(0);
    expect(vita['reducerFunctions'].size).toBe(0);

    vita.registerSlice('action_type', reducer);

    expect(vita['actionCreators'].size).toBe(1);
    expect(vita['reducerFunctions'].size).toBe(1);

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

    expect(vita['actionCreators'].size).toBe(2);

    vita.unregisterAction('action_two');
    expect(vita['actionCreators'].size).toBe(1);

    vita.unregisterAction('action_one');
    expect(vita['actionCreators'].size).toBe(0);
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

    expect(vita['reducerFunctions'].size).toBe(2);

    vita.unregisterReducer('action_one');
    expect(vita['reducerFunctions'].size).toBe(1);

    vita.unregisterReducer('action_two');
    expect(vita['reducerFunctions'].size).toBe(0);
  });

  it('Should return self on unregistering a reducer', () => {
    const vita = new Vita();
    const vitaReturned = vita.unregisterReducer('action_one');
    expect(vitaReturned).toBe(vita);
  });

  it('Should unregister a slice', () => {
    const vita = new Vita();

    const actionCreator = function(actionField: string): object {
      return { actionField };
    };

    const reducer = function(state: object): object {
      return state;
    };

    vita.registerSlice('action_type', actionCreator, reducer);

    expect(vita['actionCreators'].size).toBe(1);
    expect(vita['reducerFunctions'].size).toBe(1);

    vita.unregisterSlice('action_type');

    expect(vita['actionCreators'].size).toBe(0);
    expect(vita['reducerFunctions'].size).toBe(0);
  });

  it('Should return self on unregistering a slice', () => {
    const vita = new Vita();
    const vitaReturned = vita.unregisterSlice('action_type');
    expect(vitaReturned).toBe(vita);
  });
});

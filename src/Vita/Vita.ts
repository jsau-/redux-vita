import ActionObject from '../ActionObject';
import makeActionCreator from '../makeActionCreator';

class Vita {
  /**
   * @private
   * @type {Map}
   */
  actionCreators: Map<string, Function>;

  /**
   * @private
   * @type {?object}
   */
  defaultReducerState: object;

  /**
   * @private
   * @type {Map}
   */
  reducerFunctions: Map<string, Function>;

  /**
   * @param {object} defaultReducerState - Default reducer state to be
   * returned if attempting to reduce with a null or undefined state.
   */
  constructor(defaultReducerState: object = {}) {
    this.defaultReducerState = defaultReducerState;

    this.actionCreators = new Map();
    this.reducerFunctions = new Map();
  }

  /**
   * Gets dispatchable Redux action object for a given action type.
   *
   * @param {string} actionType - Action type to generate dispatchable
   * object for.
   * @param {...*} varargsActionCreator - Arguments to pass to the registered
   * function.
   * @returns {ActionObject} Action object.
   */
  action = (actionType: string, ...varargsActionCreator: any[]): ActionObject => {
    const actionCreator = this.actionCreators.get(actionType);

    if (!actionCreator) {
      throw new Error(`No action creator was registered for type '${actionType}'`);
    }

    return actionCreator(...varargsActionCreator);
  };

  /**
   * Clear all registered action creators.
   *
   * @returns {Vita} This.
   */
  clearAllActionCreators = (): Vita => {
    this.actionCreators.clear();
    return this;
  };

  /**
   * Clear all registered reducers for handling actions.
   *
   * @returns {Vita} This.
   */
  clearAllReducers = (): Vita => {
    this.reducerFunctions.clear();
    return this;
  }

  /**
   * Reducer function.
   *
   * @param {object} [currentReducerState] - Current reducer state.
   * @param {ActionObject} action - Occurring Redux action.
   * @returns {object} New reducer state.
   * @throws {Error} On attempting to reduce actions without a type key.
   */
  reduce = (currentReducerState: object | undefined, action: ActionObject): object => {
    let reducerState: object = currentReducerState ? currentReducerState : this.defaultReducerState;

    const { type }: { type: string } = action;

    const reducerForAction: Function | undefined = this.reducerFunctions.get(type);

    // If we have no registered handler, just fallback to current state
    if (!reducerForAction) {
      return reducerState;
    }

    return reducerForAction(reducerState, action);
  };

  /**
   * Create and register an action creator function. Note that the action
   * creator function param is optional. Omitting it will generate a default
   * action creator.
   *
   * @param {string} actionType - Action type.
   * @param {Function} [actionCreator] - Action creator function.
   * @returns {Vita} This.
   */
  registerAction = (actionType: string, actionCreator: Function | undefined): Vita => {
    let actionCreatorInstance: Function = actionCreator ?
      actionCreator :
      makeActionCreator(actionType, undefined);

    this.actionCreators.set(actionType, actionCreatorInstance);
    return this;
  }

  /**
   * Register a reducer function to handle on receiving an action with a
   * given type.
   *
   * @param {string} actionType - Action type to invoke reducer function
   * on.
   * @param {Function} reducer - Reducer function to invoke on reducing
   * action with type.
   * @returns {Vita} This.
   */
  registerReducer = (actionType: string, reducer: Function): Vita => {
    this.reducerFunctions.set(actionType, reducer);
    return this;
  }

  /**
   * Register an action creator and reducer function at the same time. Note
   * that the action creator param is optional. Omitting it will generate
   * a default action creator.
   *
   * @param {string} actionType - Action type.
   * @param {Function} reducer - Reducer function to invoke on reducing
   * action with type.
   * @param {Function} [actionCreator] - Action creator function.
   * @returns {Vita} This.
   */
  registerSlice = (actionType: string, reducer: Function, actionCreator: Function | undefined): Vita => {
    this.registerAction(actionType, actionCreator);
    this.registerReducer(actionType, reducer);
    return this;
  }

  /**
   * Unregister an action creator for a given action type.
   *
   * @param {string} actionType - Action type to unregister action creator
   * function for.
   * @returns {Vita} This.
   */
  unregisterAction = (actionType: string): Vita => {
    this.actionCreators.delete(actionType);
    return this;
  }

  /**
   * Unregister a reducer function for a given action type.
   *
   * @param {string} actionType - Action type to unregister handling reducer
   * function for.
   * @returns {Vita} This.
   */
  unregisterReducer = (actionType: string): Vita => {
    this.reducerFunctions.delete(actionType);
    return this;
  }

  /**
   * Unregister an action creator and reducer at the same time.
   *
   * @param {string} actionType - Action type to unregister.
   * @returns {Vita} This.
   */
  unregisterSlice = (actionType: string): Vita => {
    this.unregisterAction(actionType);
    this.unregisterReducer(actionType);
    return this;
  }
}

export default Vita;

import has from 'lodash/has';
import isNil from 'lodash/isNil';
import makeActionCreator from '../makeActionCreator';
import { KEY_TYPE } from '../makeActionCreator/constants';

class Vita {
  /**
   * @param {object} objDefaultReducerState - Default reducer state to be
   * returned if attempting to reduce with a null or undefined state.
   */
  constructor(objDefaultReducerState = {}) {
    /**
     * @private
     * @type {?object}
     */
    this._objDefaultReducerState = objDefaultReducerState;

    /**
     * @private
     * @type {Map}
     */
    this._mapActionCreators = new Map();

    /**
     * @private
     * @type {Map}
     */
    this._mapReducerFunctions = new Map();
  }

  /**
   * Clear all registered action creators.
   *
   * @returns {Vita} This.
   */
  clearAllActionCreators = () => {
    this._mapActionCreators.clear();
    return this;
  };

  /**
   * Clear all registered reducers for handling actions.
   *
   * @returns {Vita} This.
   */
  clearAllReducers = () => {
    this._mapReducerFunctions.clear();
    return this;
  }

  /**
   * Gets dispatchable Redux action object for a given action type.
   *
   * @param {string} strActionType - Action type to generate dispatchable
   * object for.
   * @param {...*} varargsActionCreator - Arguments to pass to the registered
   * function.
   * @returns {object} Action object.
   */
  getDispatchable = (strActionType, ...varargsActionCreator) => {
    const ufuncActionCreator = this._mapActionCreators.get(strActionType);

    if (isNil(ufuncActionCreator)) {
      throw new Error(`No action creator was registered for type '${strActionType}'`);
    }

    return ufuncActionCreator(...varargsActionCreator);
  };

  /**
   * Reducer function.
   *
   * @param {object} [uobjCurrentReducerState] - Current reducer state.
   * @param {object} objAction - Occurring Redux action.
   * @returns {object} New reducer state.
   * @throws {Error} On attempting to reduce actions without a type key.
   */
  reduce = (uobjCurrentReducerState, objAction) => {
    const objCurrentReducerState = isNil(uobjCurrentReducerState) ?
      this._objDefaultReducerState :
      uobjCurrentReducerState;

    if (!has(objAction, KEY_TYPE)) {
      throw new Error(`Action object has no '${KEY_TYPE}' key. This is invalid.`);
    }

    const { [KEY_TYPE]: strTypeForAction } = objAction;

    const ufuncReducerForAction = this._mapReducerFunctions.get(strTypeForAction);

    // If we have no registered handler, just fallback to current state
    if (isNil(ufuncReducerForAction)) {
      return objCurrentReducerState;
    }

    return ufuncReducerForAction(objCurrentReducerState, objAction);
  };

  /**
   * Create and register an action creator function.
   *
   * @param {string} strActionType - Action type.
   * @param {Function} funcActionCreator - Action creator function.
   * @returns {Vita} This.
   */
  registerActionCreator = (strActionType, funcActionCreator) => {
    this._mapActionCreators.set(strActionType, funcActionCreator);
    return this;
  }

  /**
   * Register a reducer function to handle on receiving an action with a
   * given type.
   *
   * @param {string} strActionType - Action type to invoke reducer function
   * on.
   * @param {Function} funcReducer - Reducer function to invoke on reducing
   * action with type.
   * @returns {Vita} This.
   */
  registerReducer = (strActionType, funcReducer) => {
    this._mapReducerFunctions.set(strActionType, funcReducer);
    return this;
  }

  /**
   * Register an action creator and reducer function at the same time. Note
   * that the action creator param is optional. Omitting it will generate
   * a default action creator.
   *
   * @param {string} strActionType - Action type.
   * @param {Function} funcReducer - Reducer function to invoke on reducing
   * action with type.
   * @param {Function} [ufuncActionCreator] - Action creator function.
   * @returns {Vita} This.
   */
  registerSlice = (strActionType, funcReducer, ufuncActionCreator) => {
    const funcActionCreator = isNil(ufuncActionCreator) ?
      makeActionCreator(strActionType) :
      ufuncActionCreator;

    this.registerActionCreator(strActionType, funcActionCreator);
    this.registerReducer(strActionType, funcReducer);
    return this;
  }

  /**
   * Unregister an action creator for a given action type.
   *
   * @param {string} strActionType - Action type to unregister action creator
   * function for.
   * @returns {Vita} This.
   */
  unregisterActionCreator = (strActionType) => {
    this._mapActionCreators.delete(strActionType);
    return this;
  }

  /**
   * Unregister a reducer function for a given action type.
   *
   * @param {string} strActionType - Action type to unregister handling reducer
   * function for.
   * @returns {Vita} This.
   */
  unregisterReducer = (strActionType) => {
    this._mapReducerFunctions.delete(strActionType);
    return this;
  }

  /**
   * Unregister an action creator and reducer at the same time.
   *
   * @param {string} strActionType - Action type to unregister.
   * @returns {Vita} This.
   */
  unregisterSlice = (strActionType) => {
    this.unregisterActionCreator(strActionType);
    this.unregisterReducer(strActionType);
    return this;
  }
}

export default Vita;

import isNil from 'lodash/isNil';
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
    this.objDefaultReducerState = objDefaultReducerState;

    /**
     * @private
     * @type {Map}
     */
    this.mapActionCreators = new Map();

    /**
     * @private
     * @type {Map}
     */
    this.mapReducerFunctions = new Map();
  }

  /**
   * Clear all registered action creators.
   *
   * @returns {Vita} This.
   */
  clearAllActionCreators = () => {
    this.mapActionCreators.clear();
    return this;
  };

  /**
   * Clear all registered reducers for handling actions.
   *
   * @returns {Vita} This.
   */
  clearAllReducers = () => {
    this.mapReducerFunctions.clear();
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
    const ufuncActionCreator = this.mapActionCreators.get(strActionType);

    if (isNil(ufuncActionCreator)) {
      throw new Error(`No action creator was registered for type ${strActionType}`);
    }

    return ufuncActionCreator(...varargsActionCreator);
  };

  /**
   * Reducer function.
   *
   * @param {object} [uobjCurrentReducerState] - Current reducer state.
   * @param {object} objAction - Occurring Redux action.
   * @returns {object} New reducer state.
   */
  reduce = (uobjCurrentReducerState, objAction) => {
    const objCurrentReducerState = isNil(uobjCurrentReducerState) ?
      this.objDefaultReducerState :
      uobjCurrentReducerState;

    /*
     * We shouldn't have to error check here since all valid Redux actions are
     * required to have a 'type' property. See:
     * https://redux.js.org/basics/actions/
     */
    const { [KEY_TYPE]: strTypeForAction } = objAction;

    const ufuncReducerForAction = this.mapReducerFunctions.get(strTypeForAction);

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
   * @param {Function} [funcActionCreator] - Action creator function.
   * @returns {Vita} This.
   */
  registerActionCreator = (strActionType, funcActionCreator) => {
    this.mapActionCreators.set(strActionType, funcActionCreator);
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
    this.mapReducerFunctions.set(strActionType, funcReducer);
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
    this.mapActionCreators.delete(strActionType);
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
    this.mapReducerFunctions.delete(strActionType);
    return this;
  }
}

export default Vita;

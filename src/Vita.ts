import { ActionObject } from './ActionObject';
import { makeActionCreator } from './makeActionCreator';
import { ReducerState } from './ReducerState';

export class Vita {
  private actionCreators: Map<string, Function>;
  private defaultReducerState: object;
  private reducerFunctions: Map<string, Function>;

  /**
   * @param defaultReducerState - Default reducer state to be
   * returned if attempting to reduce with a null or undefined state.
   */
  constructor(defaultReducerState: object = {}) {
    this.defaultReducerState = defaultReducerState;

    this.actionCreators = new Map();
    this.reducerFunctions = new Map();

    this.action = this.action.bind(this);
    this.clearAllActionCreators = this.clearAllActionCreators.bind(this);
    this.clearAllReducers = this.clearAllReducers.bind(this);
    this.reduce = this.reduce.bind(this);
    this.registerAction = this.registerAction.bind(this);
    this.registerReducer = this.registerReducer.bind(this);
    this.registerSlice = this.registerSlice.bind(this);
    this.unregisterAction = this.unregisterAction.bind(this);
    this.unregisterReducer = this.unregisterReducer.bind(this);
    this.unregisterSlice = this.unregisterSlice.bind(this);
  }

  /**
   * Gets dispatchable Redux action object for a given action type.
   *
   * @param actionType - Action type to generate dispatchable
   * object for.
   * @param varargsActionCreator - Arguments to pass to the registered
   * function.
   * @returns Action object.
   */
  public action<Type extends string, Fields extends object>(
    actionType: Type,
    ...varargsActionCreator: any[]
  ): ActionObject<Type, Fields> {
    const actionCreator = this.actionCreators.get(actionType);

    if (!actionCreator) {
      throw new Error(
        `No action creator was registered for type '${actionType}'`,
      );
    }

    return actionCreator(...varargsActionCreator);
  }

  /**
   * Clear all registered action creators.
   *
   * @returns This.
   */
  public clearAllActionCreators(): Vita {
    this.actionCreators.clear();
    return this;
  }

  /**
   * Clear all registered reducers for handling actions.
   *
   * @returns This.
   */
  public clearAllReducers(): Vita {
    this.reducerFunctions.clear();
    return this;
  }

  /**
   * Reducer function.
   *
   * @param currentReducerState - Current reducer state.
   * @param action - Occurring Redux action.
   * @returns New reducer state.
   */
  public reduce<
    Type extends string,
    ReducerFields extends object,
    ActionFields extends object
  >(
    currentReducerState: ReducerState<ReducerFields> | undefined,
    action: ActionObject<Type, ActionFields>,
  ): object {
    const reducerState = currentReducerState ?? this.defaultReducerState;

    const { type } = action;

    const reducerForAction = this.reducerFunctions.get(type);

    // If we have no registered handler, just fallback to current state
    if (!reducerForAction) {
      return reducerState;
    }

    return reducerForAction(reducerState, action);
  }

  /**
   * Create and register an action creator function. Note that the action
   * creator function param is optional. Omitting it will generate a default
   * action creator.
   *
   * @param actionType - Action type.
   * @param actionCreator - Action creator function.
   * @returns This.
   */
  public registerAction(actionType: string, actionCreator?: Function): Vita {
    const actionCreatorInstance =
      actionCreator ?? makeActionCreator(actionType, undefined);

    this.actionCreators.set(actionType, actionCreatorInstance);
    return this;
  }

  /**
   * Register a reducer function to handle on receiving an action with a
   * given type.
   *
   * @param actionType - Action type to invoke reducer function
   * on.
   * @param reducer - Reducer function to invoke on reducing
   * action with type.
   * @returns This.
   */
  public registerReducer(actionType: string, reducer: Function): Vita {
    this.reducerFunctions.set(actionType, reducer);
    return this;
  }

  /**
   * Register an action creator and reducer function at the same time. Note
   * that the action creator param is optional. Omitting it will generate
   * a default action creator.
   *
   * @param actionType - Action type.
   * @param reducer - Reducer function to invoke on reducing
   * action with type.
   * @param actionCreator - Action creator function.
   * @returns This.
   */
  public registerSlice(
    actionType: string,
    reducer: Function,
    actionCreator?: Function,
  ): Vita {
    this.registerAction(actionType, actionCreator);
    this.registerReducer(actionType, reducer);
    return this;
  }

  /**
   * Unregister an action creator for a given action type.
   *
   * @param actionType - Action type to unregister action creator
   * function for.
   * @returns This.
   */
  public unregisterAction(actionType: string): Vita {
    this.actionCreators.delete(actionType);
    return this;
  }

  /**
   * Unregister a reducer function for a given action type.
   *
   * @param actionType - Action type to unregister handling reducer
   * function for.
   * @returns This.
   */
  public unregisterReducer(actionType: string): Vita {
    this.reducerFunctions.delete(actionType);
    return this;
  }

  /**
   * Unregister an action creator and reducer at the same time.
   *
   * @param actionType - Action type to unregister.
   * @returns This.
   */
  public unregisterSlice(actionType: string): Vita {
    this.unregisterAction(actionType);
    this.unregisterReducer(actionType);
    return this;
  }
}

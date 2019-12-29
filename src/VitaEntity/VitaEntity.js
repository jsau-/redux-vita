import isNil from 'lodash/isNil';
import Operation from '../Operation';
import operationRemoveField from '../operations/operationRemoveField';
import isReduxActionRelevantToVitaEntity from '../util/isReduxActionRelevantToVitaEntity';
import { KEY_IDENTIFER } from '../util/deltaCreator/constants';

class VitaEntity {
  /**
   * @param {string} strEntityName - Entity name.
   * @param {object} [objDefaultReducerState={}] - Default reducer state to be
   * returned if attempting to reduce with a null or undefined state.
   */
  constructor(strEntityName, objDefaultReducerState = {}) {
    this.strEntityName = strEntityName;
    this.objDefaultReducerState = objDefaultReducerState;
    this.mapOperations = new Map();

    // Register default operations
    this.registerOperation(operationRemoveField(strEntityName));
  }

  /**
   * @returns {undefined}
   */
  clearAllRegisteredOperations = () => this.mapOperations.clear();

  /**
   * @param {string} strOperationIdentifier - Operation identifier to create
   * dispatchable raw object for.
   * @param {...*} varargs - Additional arguments to provide to operation
   * DeltaObject creator function.
   * @returns {object} Redux-dispatchable raw object.
   * @throws {Error} If no operation with provided identifier is registered.
   */
  getDispatchableActionObjectForOperation = (strOperationIdentifier, ...varargs) => {
    const uoperation = this.mapOperations.get(strOperationIdentifier);

    if (isNil(uoperation)) {
      throw new Error(`No registered operation with identifier ${strOperationIdentifier}`);
    }

    return uoperation.createDelta(...varargs);
  };

  /**
   * @returns {string} Entity name.
   */
  getEntityName = () => this.strEntityName;

  /**
   * @param {object} [uobjCurrentReducerState] - Current Redux reducer state.
   * @param {object} objOccurringReduxAction - Occurring Redux action.
   * @returns {object} New reducer state after processing occurring Redux action.
   */
  reduce = (uobjCurrentReducerState, objOccurringReduxAction) => {
    /**
     * Reducers in Redux default to undefined. In that case, fallback to the
     * default state provided in the ctor
     */
    const objCurrentReducerState = isNil(uobjCurrentReducerState) ?
      this.objDefaultReducerState :
      uobjCurrentReducerState;

    /**
     * If the provided Redux action isn't relevant here (whether for a different
     * entity, or of an unexpected format eg. from an action not generated by
     * this library, then just return current state)
     */
    if (!isReduxActionRelevantToVitaEntity(this.strEntityName, objOccurringReduxAction)) {
      return objCurrentReducerState;
    }

    const { [KEY_IDENTIFER]: strOperationIdentifier } = objOccurringReduxAction;
    const uoperation = this.mapOperations.get(strOperationIdentifier);

    /**
     * If we have no operation registered matching the operation identifier,
     * then just return current state
     */
    if (isNil(uoperation)) {
      return objCurrentReducerState;
    }

    return uoperation.getReducerStateAfterProcessingDelta(objCurrentReducerState, objOccurringReduxAction);
  };

  /**
   * @param {Operation} operation - Operation to register for entity.
   * @returns {undefined}
   */
  registerOperation = (operation) => {
    const strOperationIdentifier = operation.getIdentifer();
    this.mapOperations.set(strOperationIdentifier, operation);
  };

  /**
   * @param {string} strOperationIdentifier - Operation identifier to unregister.
   * @returns {boolean} Whether the given operation identifier had previously
   * been registered before removal.
   */
  unregisterOperationWithIdentifier = strOperationIdentifier => this.mapOperations.delete(strOperationIdentifier);
}

export default VitaEntity;

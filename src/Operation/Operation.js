import isEmpty from 'lodash/isEmpty';
import DeltaCreator from '../typedef/DeltaCreator';
import DeltaHandler from '../typedef/DeltaHandler';
import DeltaObject from '../typedef/DeltaObject';
import isDeltaObjectRelevantToOperation from '../util/isDeltaObjectRelevantToOperation';
import { KEY_PAYLOAD } from '../util/deltaCreator/constants';

class Operation {
  /**
   * @param {string} strEntityName - Entity name operation applies to.
   * @param {string} strIdentifier - Operation identifier.
   * @param {DeltaCreator} funcDeltaCreator - Function to generate a raw object
   * representing the operation's delta.
   * @param {DeltaHandler} funcDeltaHandler - Function to process a delta object instance,
   * and mutate reducer state in some way.
   * @throws {Error} If identifier is empty.
   */
  constructor(strEntityName, strIdentifier, funcDeltaCreator, funcDeltaHandler) {
    if (isEmpty(strEntityName)) {
      throw new Error('Operation entity name cannot be empty.');
    }

    if (isEmpty(strIdentifier)) {
      throw new Error('Operation identifier cannot be empty.');
    }

    this.strEntityName = strEntityName;
    this.strIdentifier = strIdentifier;
    this.funcDeltaCreator = funcDeltaCreator;
    this.funcDeltaHandler = funcDeltaHandler;
  }

  /**
   * Create a delta object using the registered delta creator.
   *
   * @param {...*} varargs - Arguments to pass to the delta creator function.
   * @returns {DeltaObject} Created delta object.
   */
  createDelta = (...varargs) => this.funcDeltaCreator(...varargs);

  /**
   * @returns {string} Operation identifier.
   */
  getIdentifer = () => this.strIdentifier;

  /**
   * Gets reducer state after processing a delta object.
   *
   * @param {object} [uobjCurrentReducerState] - Current reducer state (note that
   * according to Redux conventions this will be 'undefined' on first invocation).
   * @param {DeltaObject} objOccurringDelta - Occurring delta object to process.
   * @returns {object} Reducer state after processing the delta.
   */
  getReducerStateAfterProcesssingDelta = (uobjCurrentReducerState, objOccurringDelta) => {
    if (!isDeltaObjectRelevantToOperation(this.strEntityName, this.strIdentifier, objOccurringDelta)) {
      return uobjCurrentReducerState;
    }

    const { [KEY_PAYLOAD]: objPayloadForOccurringDelta } = objOccurringDelta;

    return this.funcDeltaHandler(uobjCurrentReducerState, objPayloadForOccurringDelta);
  }
}

export default Operation;

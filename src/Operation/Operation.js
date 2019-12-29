import isEmpty from 'lodash/isEmpty';
import DeltaCreator from '../typedef/DeltaCreator';
import DeltaHandler from '../typedef/DeltaHandler';
import DeltaObject from '../typedef/DeltaObject';

class Operation {
  /**
   * @param {string} strIdentifier - Operation identifier.
   * @param {DeltaCreator} funcDeltaCreator - Function to generate a raw object
   * representing the operation's delta.
   * @param {DeltaHandler} funcDeltaHandler - Function to process a delta object instance,
   * and mutate reducer state in some way.
   * @throws {Error} If identifier is empty.
   */
  constructor(strIdentifier, funcDeltaCreator, funcDeltaHandler) {
    if (isEmpty(strIdentifier)) {
      throw new Error('Operation identifier cannot be empty.');
    }

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
  getReducerStateAfterProcesssingDelta = (uobjCurrentReducerState, objOccurringDelta) =>
    this.funcDeltaHandler(uobjCurrentReducerState, objOccurringDelta);
}

export default Operation;

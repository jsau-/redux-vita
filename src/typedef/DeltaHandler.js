import DeltaObject from './DeltaObject';

/**
 * @typedef {function} DeltaHandler
 * @param {object} [uobjCurrentReducerState] - Current reducer state (note that
 * according to Redux conventions this will be 'undefined' on first invocation).
 * @param {DeltaObject} objOccurringDelta - Occurring delta object to process.
 * @returns {object} Reducer state after processing the delta.
 */

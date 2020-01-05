import has from 'lodash/has';
import ReducerState from '../ReducerState';

/**
 * Reducer function for decrementing a numeric field.
 *
 * @param {ReducerState} reducerState - Current reducer state.
 * @param {string} fieldName - Field to decrement.
 * @returns {object} Reducer state after decrementing field.
 * @throws {Error} If field does not exists.
 * @throws {TypeError} If field is not a number.
 */
export default (reducerState: ReducerState, fieldName: string) => {
  if (!has(reducerState, fieldName)) {
    throw new Error(`Field '${fieldName}' does not exist on current state, and hence cannot be decremented.`);
  }

  const mixedFieldValue: any = reducerState[fieldName];

  if ('number' !== typeof mixedFieldValue) {
    throw new TypeError(
      `Invalid type for decrementing field '${fieldName}'. Expected 'number', got '${typeof mixedFieldValue}'`,
    );
  }

  return {
    ...reducerState,
    [fieldName]: mixedFieldValue - 1,
  };
};

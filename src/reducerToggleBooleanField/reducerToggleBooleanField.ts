import has from 'lodash/has';
import ReducerState from '../ReducerState';

/**
 * Reducer function for toggling a boolean field.
 *
 * @param {object} reducerState - Current reducer state.
 * @param {string} fieldName - Field to toggle.
 * @returns {object} Reducer state after toggling field.
 * @throws {Error} If field does not exists.
 * @throws {TypeError} If field is not a boolean.
 */
export default (reducerState: ReducerState, fieldName: string) => {
  if (!has(reducerState, fieldName)) {
    throw new Error(`Field '${fieldName}' does not exist on current state, and hence cannot be toggled.`);
  }

  const mixedFieldValue = reducerState[fieldName];

  if ('boolean' !== typeof mixedFieldValue) {
    throw new TypeError(
      `Invalid type for toggling field '${fieldName}'. Expected 'boolean', got '${typeof mixedFieldValue}'`,
    );
  }

  return {
    ...reducerState,
    [fieldName]: !mixedFieldValue,
  };
};

import has from 'lodash/has';

/**
 * Reducer function for incrementing a numeric field.
 *
 * @param {object} reducerState - Current reducer state.
 * @param {string} fieldName - Field to increment.
 * @returns {object} Reducer state after incrementing field.
 * @throws {Error} If field does not exists.
 * @throws {TypeError} If field is not a number.
 */
export default (reducerState: any, fieldName: string) => {
  if (!has(reducerState, fieldName)) {
    throw new Error(`Field '${fieldName}' does not exist on current state, and hence cannot be incremented.`);
  }

  const mixedFieldValue = reducerState[fieldName];

  if ('number' !== typeof mixedFieldValue) {
    throw new TypeError(
      `Invalid type for incrementing field '${fieldName}'. Expected 'number', got '${typeof mixedFieldValue}'`,
    );
  }

  return {
    ...reducerState,
    [fieldName]: mixedFieldValue + 1,
  };
};

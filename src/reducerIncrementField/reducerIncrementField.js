import has from 'lodash/has';

/**
 * Reducer function for incrementing a numeric field.
 *
 * @param {object} objReducerState - Current reducer state.
 * @param {string} strFieldName - Field to increment.
 * @returns {object} Reducer state after incrementing field.
 * @throws {Error} If field does not exists.
 * @throws {TypeError} If field is not a number.
 */
export default (objReducerState, strFieldName) => {
  if (!has(objReducerState, strFieldName)) {
    throw new Error(`Field '${strFieldName}' does not exist on current state, and hence cannot be incremented.`);
  }

  const mixedFieldValue = objReducerState[strFieldName];

  if ('number' !== typeof mixedFieldValue) {
    throw new TypeError(
      `Invalid type for incrementing field '${strFieldName}'. Expected 'number', got '${typeof mixedFieldValue}'`,
    );
  }

  return {
    ...objReducerState,
    [strFieldName]: mixedFieldValue + 1,
  };
};

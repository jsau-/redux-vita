import has from 'lodash/has';

/**
 * Reducer function for toggling a boolean field.
 *
 * @param {object} objReducerState - Current reducer state.
 * @param {string} strFieldName - Field to toggle.
 * @returns {object} Reducer state after toggling field.
 * @throws {Error} If field does not exists.
 * @throws {TypeError} If field is not a boolean.
 */
export default (objReducerState, strFieldName) => {
  if (!has(objReducerState, strFieldName)) {
    throw new Error(`Field '${strFieldName}' does not exist on current state, and hence cannot be toggled.`);
  }

  const mixedFieldValue = objReducerState[strFieldName];

  if ('boolean' !== typeof mixedFieldValue) {
    throw new TypeError(
      `Invalid type for toggling field '${strFieldName}'. Expected 'boolean', got '${typeof mixedFieldValue}'`,
    );
  }

  return {
    ...objReducerState,
    [strFieldName]: !mixedFieldValue,
  };
};

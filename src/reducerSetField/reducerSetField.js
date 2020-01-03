/**
 * Reducer function for setting a field.
 *
 * @param {object} objReducerState - Current reducer state.
 * @param {string} strFieldName - Field name to set.
 * @param {*} mixedFieldValue - Field value to set.
 * @returns {object} Reducer state after setting field.
 */
export default (objReducerState, strFieldName, mixedFieldValue) => ({
  ...objReducerState,
  [strFieldName]: mixedFieldValue,
});

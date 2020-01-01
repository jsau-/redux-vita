/**
 * @param {object} objCurrentReducerState - Current reducer state.
 * @param {string} strFieldToSet - Field name to set in reducer state.
 * @param {*} mixedFieldValue - Field value to set in reducer state.
 * @returns {object} Reducer state after setting field.
 */
export default (objCurrentReducerState, strFieldToSet, mixedFieldValue) => ({
  ...objCurrentReducerState,
  [strFieldToSet]: mixedFieldValue,
});

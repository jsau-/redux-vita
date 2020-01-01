/**
 * @param {object} objCurrentReducerState - Current reducer state.
 * @param {object} objFieldsToSet - Fields to set in reducer state.
 * @returns {object} Reducer state after setting many fields.
 */
export default (objCurrentReducerState, objFieldsToSet) => ({
  ...objCurrentReducerState,
  ...objFieldsToSet,
});

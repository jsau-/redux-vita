/**
 * Reducer function for setting many fields.
 *
 * @param {object} objReducerState - Current reducer state.
 * @param {object} objFieldsToSet - Fields to set.
 * @returns {object} Reducer state after setting fields.
 */
export default (objReducerState, objFieldsToSet) => ({
  ...objReducerState,
  ...objFieldsToSet,
});

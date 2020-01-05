/**
 * Reducer function for setting many fields.
 *
 * @param {object} reducerState - Current reducer state.
 * @param {object} fieldsToSet - Fields to set.
 * @returns {object} Reducer state after setting fields.
 */
export default (reducerState: object, fieldsToSet: object) => ({
  ...reducerState,
  ...fieldsToSet,
});

import ReducerState from "../ReducerState";

/**
 * Reducer function for setting a field.
 *
 * @param {object} reducerState - Current reducer state.
 * @param {string} fieldName - Field name to set.
 * @param {*} fieldValue - Field value to set.
 * @returns {object} Reducer state after setting field.
 */
export default (reducerState: ReducerState, fieldName: string, fieldValue: string) => ({
  ...reducerState,
  [fieldName]: fieldValue,
});

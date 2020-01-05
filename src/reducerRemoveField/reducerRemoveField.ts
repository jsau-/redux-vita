import ReducerState from "../ReducerState";

/**
 * Reducer function for removing a field.
 *
 * @param {ReducerState} reducerState - Current reducer state.
 * @param {string} fieldName - Field name to remove.
 * @returns {object} Reducer state after removing field.
 */
export default (reducerState: ReducerState, fieldName: string) => {
  const {
    [fieldName]: mixedFieldToRemove,
    ...reducerStateWithoutRemovedField
  } = reducerState;

  return reducerStateWithoutRemovedField;
};

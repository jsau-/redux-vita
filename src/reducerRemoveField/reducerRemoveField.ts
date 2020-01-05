/**
 * Reducer function for removing a field.
 *
 * @param {object} reducerState - Current reducer state.
 * @param {string} fieldName - Field name to remove.
 * @returns {object} Reducer state after removing field.
 */
export default (reducerState: any, fieldName: string) => {
  const {
    [fieldName]: mixedFieldToRemove,
    ...reducerStateWithoutRemovedField
  } = reducerState;

  return reducerStateWithoutRemovedField;
};

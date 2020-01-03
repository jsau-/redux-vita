/**
 * Reducer function for removing a field.
 *
 * @param {object} objReducerState - Current reducer state.
 * @param {string} strFieldName - Field name to remove.
 * @returns {object} Reducer state after removing field.
 */
export default (objReducerState, strFieldName) => {
  const {
    [strFieldName]: mixedFieldToRemove,
    ...objReducerStateWithoutRemovedField
  } = objReducerState;

  return objReducerStateWithoutRemovedField;
};

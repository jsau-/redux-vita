/**
 * @param {object} objCurrentReducerState - Current reducer state.
 * @param {string} strFieldToRemove - Field to remove from reducer state.
 * @returns {object} Reducer state after removing field.
 */
export default (objCurrentReducerState, strFieldToRemove) => {
  const {
    [strFieldToRemove]: mixedValueToRemove,
    ...objReducerStateWithoutRemovedField
  } = objCurrentReducerState;

  return objReducerStateWithoutRemovedField;
};

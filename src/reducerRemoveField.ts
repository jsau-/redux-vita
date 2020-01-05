import { ReducerState } from './ReducerState';

/**
 * Reducer function for removing a field.
 *
 * @param reducerState - Current reducer state.
 * @param fieldName - Field name to remove.
 * @returns Reducer state after removing field.
 */
export function reducerRemoveField (reducerState: ReducerState, fieldName: string): ReducerState {
  const {
    [fieldName]: mixedFieldToRemove,
    ...reducerStateWithoutRemovedField
  } = reducerState;

  return reducerStateWithoutRemovedField;
};

export default reducerRemoveField;

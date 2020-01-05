import { ReducerState } from './ReducerState';

/**
 * Reducer function for removing a field.
 *
 * @param reducerState - Current reducer state.
 * @param fieldName - Field name to remove.
 * @returns Reducer state after removing field.
 */
export function reducerRemoveField<ReducerFields extends object>(
  reducerState: ReducerState<ReducerFields>,
  fieldName: string,
): Pick<ReducerFields, Exclude<keyof ReducerFields, string>> {
  const {
    [fieldName]: ignoredField,
    ...reducerStateWithoutRemovedField
  } = reducerState;

  return reducerStateWithoutRemovedField;
}

export default reducerRemoveField;

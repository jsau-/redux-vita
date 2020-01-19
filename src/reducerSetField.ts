import { ReducerState } from './ReducerState';

/**
 * Reducer function for setting a field.
 *
 * @param reducerState - Current reducer state.
 * @param fieldName - Field name to set.
 * @param fieldValue - Field value to set.
 * @returns Reducer state after setting field.
 */
export function reducerSetField<ReducerFields extends object>(
  reducerState: ReducerState<ReducerFields>,
  fieldName: string,
  fieldValue: string,
): ReducerState<ReducerFields> {
  return {
    ...reducerState,
    [fieldName]: fieldValue,
  };
}

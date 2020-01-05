import { ReducerState } from './ReducerState';

/**
 * Reducer function for setting a field.
 *
 * @param reducerState - Current reducer state.
 * @param fieldName - Field name to set.
 * @param fieldValue - Field value to set.
 * @returns Reducer state after setting field.
 */
export function reducerSetField(
  reducerState: ReducerState,
  fieldName: string,
  fieldValue: string,
): ReducerState {
  return {
    ...reducerState,
    [fieldName]: fieldValue,
  };
}

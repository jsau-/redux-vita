import { ReducerState } from './ReducerState';

/**
 * Reducer function for setting many fields.
 *
 * @param reducerState - Current reducer state.
 * @param fieldsToSet - Fields to set.
 * @returns Reducer state after setting fields.
 */
export function reducerSetManyFields(
  reducerState: ReducerState,
  fieldsToSet: object,
): ReducerState {
  return {
    ...reducerState,
    ...fieldsToSet,
  };
}

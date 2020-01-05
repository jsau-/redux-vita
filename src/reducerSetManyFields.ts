import { ReducerState } from './ReducerState';

/**
 * Reducer function for setting many fields.
 *
 * @param reducerState - Current reducer state.
 * @param fieldsToSet - Fields to set.
 * @returns Reducer state after setting fields.
 */
export function reducerSetManyFields<ReducerFields extends object>(
  reducerState: ReducerState<ReducerFields>,
  fieldsToSet: object,
): ReducerState<ReducerFields> {
  return {
    ...reducerState,
    ...fieldsToSet,
  };
}

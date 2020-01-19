import omit from 'lodash/omit';
import { ReducerState } from './ReducerState';

/**
 * Reducer function for removing many fields.
 *
 * @param reducerState - Current reducer state.
 * @param fieldNames - Field names to remove.
 * @returns Reducer state after removing fields.
 */
export function reducerRemoveManyFields<ReducerFields extends object>(
  reducerState: ReducerState<ReducerFields>,
  fieldsToRemove: string[],
): Pick<ReducerFields, Exclude<keyof ReducerFields, string>> {
  return omit(reducerState, fieldsToRemove);
}

export default reducerRemoveManyFields;

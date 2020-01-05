import omit from 'lodash/omit';
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
  return omit(reducerState, fieldName);
}

export default reducerRemoveField;

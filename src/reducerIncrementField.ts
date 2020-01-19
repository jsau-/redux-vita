import has from 'lodash/has';
import { ReducerState } from './ReducerState';

/**
 * Reducer function for incrementing a numeric field.
 *
 * @param reducerState - Current reducer state.
 * @param fieldName - Field to increment.
 * @returns Reducer state after incrementing field.
 * @throws {Error} If field does not exists.
 * @throws {TypeError} If field is not a number.
 */
export function reducerIncrementField<ReducerFields extends object>(
  reducerState: ReducerState<ReducerFields>,
  fieldName: string,
): ReducerState<ReducerFields> {
  if (!has(reducerState, fieldName)) {
    throw new Error(
      `Field '${fieldName}' does not exist on current state, and hence cannot \
be incremented.`,
    );
  }

  const fieldValue = reducerState[fieldName];

  if ('number' !== typeof fieldValue) {
    throw new TypeError(
      `Invalid type for incrementing field '${fieldName}'. Expected 'number', \
got '${typeof fieldValue}'`,
    );
  }

  return {
    ...reducerState,
    [fieldName]: fieldValue + 1,
  };
}

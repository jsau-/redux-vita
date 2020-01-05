import has from 'lodash/has';
import { ReducerState } from './ReducerState';

/**
 * Reducer function for decrementing a numeric field.
 *
 * @param reducerState - Current reducer state.
 * @param fieldName - Field to decrement.
 * @returns Reducer state after decrementing field.
 * @throws {Error} If field does not exists.
 * @throws {TypeError} If field is not a number.
 */
export function reducerDecrementField<ReducerFields extends object>(
  reducerState: ReducerState<ReducerFields>,
  fieldName: string,
): ReducerState<ReducerFields> {
  if (!has(reducerState, fieldName)) {
    throw new Error(
      `Field '${fieldName}' does not exist on current state, and hence cannot \
be decremented.`,
    );
  }

  const fieldValue = reducerState[fieldName];

  if ('number' !== typeof fieldValue) {
    throw new TypeError(
      `Invalid type for decrementing field '${fieldName}'. Expected 'number', \
got '${typeof fieldValue}'`,
    );
  }

  return {
    ...reducerState,
    [fieldName]: fieldValue - 1,
  };
}

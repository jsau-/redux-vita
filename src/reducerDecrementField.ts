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
export function reducerDecrementField(
  reducerState: ReducerState,
  fieldName: string,
): ReducerState {
  if (!has(reducerState, fieldName)) {
    throw new Error(
      `Field '${fieldName}' does not exist on current state, and hence cannot be decremented.`,
    );
  }

  const mixedFieldValue: any = reducerState[fieldName];

  if ('number' !== typeof mixedFieldValue) {
    throw new TypeError(
      `Invalid type for decrementing field '${fieldName}'. Expected 'number', got '${typeof mixedFieldValue}'`,
    );
  }

  return {
    ...reducerState,
    [fieldName]: mixedFieldValue - 1,
  };
}

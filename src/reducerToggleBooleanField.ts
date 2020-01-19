import has from 'lodash/has';
import { ReducerState } from './ReducerState';

/**
 * Reducer function for toggling a boolean field.
 *
 * @param reducerState - Current reducer state.
 * @param fieldName - Field to toggle.
 * @returns Reducer state after toggling field.
 * @throws {Error} If field does not exists.
 * @throws {TypeError} If field is not a boolean.
 */
export function reducerToggleBooleanField<ReducerFields extends object>(
  reducerState: ReducerState<ReducerFields>,
  fieldName: string,
): ReducerState<ReducerFields> {
  if (!has(reducerState, fieldName)) {
    throw new Error(
      `Field '${fieldName}' does not exist on current state, and hence cannot \
be toggled.`,
    );
  }

  const fieldValue = reducerState[fieldName];

  if ('boolean' !== typeof fieldValue) {
    throw new TypeError(
      `Invalid type for toggling field '${fieldName}'. Expected 'boolean', got \
'${typeof fieldValue}'`,
    );
  }

  return {
    ...reducerState,
    [fieldName]: !fieldValue,
  };
}

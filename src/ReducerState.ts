/**
 * ReducerState is a list of string-indexed properties.
 */
export type ReducerState<ReducerFields extends object> = ReducerFields & {
  [key: string]: unknown;
};

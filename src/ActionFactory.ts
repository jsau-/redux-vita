/**
 * ActionFactory is a function which accepts some varargs, and returns an object
 * with known fields.
 */
export interface ActionFactory<
  Args extends unknown[],
  ActionFields extends object
> {
  (...args: Args): ActionFields;
}

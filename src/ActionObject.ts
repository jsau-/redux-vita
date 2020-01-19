import { ActionType } from './ActionType';

/**
 * ActionObject is an object with a type, and some list of known fields.
 */
export type ActionObject<
  Type extends string,
  ActionFields extends object
> = ActionType<Type> & ActionFields;

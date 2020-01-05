import isEmpty from 'lodash/isEmpty';
import { ActionFactory } from './ActionFactory';

/**
 * @param type - Action type.
 * @param propertyCreator - Optional function to generate additional properties
 * on the resultant action.
 * @returns Function that creates action objects.
 * @throws {Error} If action type is empty.
 */
export function makeActionCreator<
  Args extends unknown[],
  ActionFields extends object
>(type: string, propertyCreator?: ActionFactory<Args, ActionFields>): Function {
  /**
   * NB: Param validation has been separated from the returned function body
   * since we should only have to do it _once_ rather than on each function
   * call.
   */
  if (isEmpty(type)) {
    throw new Error('Type must not be empty.');
  }

  return (...args: Args): object => {
    let additionalProperties = {};

    if (propertyCreator) {
      additionalProperties = propertyCreator(...args);
    }

    return {
      ...additionalProperties,
      type,
    };
  };
}

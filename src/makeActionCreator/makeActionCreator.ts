import isEmpty from 'lodash/isEmpty';
import ActionObject from '../ActionObject';

type PropertyCreator = (...args: any[]) => ActionObject;

/**
 * @param {string} type - Action type.
 * @param {Function} [propertyCreator] - Optional function to
 * generate additional properties to the action.
 * @returns {Function} Function that creates action objects.
 * @throws {Error} If action type is empty, or additional generated properties
 * were not a plain object.
 */
export default (type: string, propertyCreator: PropertyCreator | undefined): Function => {
  /**
   * NB: Param validation has been separated from the returned function body
   * since we should only have to do it _once_ rather than on each function
   * call.
   */
  if (isEmpty(type)) {
    throw new Error('Type must not be empty.');
  }

  return (...args: any[]) => {
    let additionalProperties: object = {};

    if (propertyCreator) {
      additionalProperties = propertyCreator(...args);
    }

    return {
      ...additionalProperties,
      type,
    };
  };
};

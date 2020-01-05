import isEmpty from 'lodash/isEmpty';
import isPlainObject from 'lodash/isPlainObject';

/**
 * @param {string} type - Action type.
 * @param {Function} [propertyCreator] - Optional function to
 * generate additional properties to the action.
 * @returns {Function} Function that creates action objects.
 * @throws {Error} If action type is empty, or additional generated properties
 * were not a plain object.
 */
export default (type: string, propertyCreator: Function | undefined): Function => {
  /**
   * NB: Param validation has been separated from the returned function body
   * since we should only have to do it _once_ rather than on each function
   * call.
   */
  if (isEmpty(type)) {
    throw new Error('Type must not be empty.');
  }

  return (...varargsPropertyCreator: any[]) => {
    let additionalProperties: object = {};

    if (propertyCreator) {
      additionalProperties = propertyCreator(...varargsPropertyCreator);
    }

    /**
     * Sanity-check our property creator function actually generated a plain
     * object (otherwise we'll run into issues w/ Redux later...)
     */
    if (!isPlainObject(additionalProperties)) {
      throw new Error(
        `Property creator function generated an invalid type. Expected plain \
object, got '${typeof additionalProperties}'`,
      );
    }

    return {
      ...additionalProperties,
      type,
    };
  };
};

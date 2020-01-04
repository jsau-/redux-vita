import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isPlainObject from 'lodash/isPlainObject';
import { KEY_TYPE } from './constants';

/**
 * @param {string} strType - Action type.
 * @param {Function} [ufuncPropertyCreator] - Optional function to
 * generate additional properties to the action.
 * @returns {Function} Function that creates action objects.
 * @throws {Error} If action type is empty, or additional generated properties
 * were not a plain object.
 */
export default (strType, ufuncPropertyCreator) => {
  /**
   * NB: Param validation has been separated from the returned function body
   * since we should only have to do it _once_ rather than on each function
   * call.
   */
  if (isEmpty(strType)) {
    throw new Error('Type must not be empty.');
  }

  return (...varargsPropertyCreator) => {
    const objAdditionalProperties = isNil(ufuncPropertyCreator) ?
      {} :
      ufuncPropertyCreator(...varargsPropertyCreator);

    /**
     * Sanity-check our property creator function actually generated a plain
     * object (otherwise we'll run into issues w/ Redux later...)
     */
    if (!isPlainObject(objAdditionalProperties)) {
      throw new Error(
        `Property creator function generated an invalid type. Expected plain \
object, got '${typeof objAdditionalProperties}'`,
      );
    }

    return {
      ...objAdditionalProperties,
      [KEY_TYPE]: strType,
    };
  };
};

import isEmpty from 'lodash/isEmpty';
import { KEY_ENTITY_NAME, KEY_IDENTIFER, KEY_PAYLOAD } from './constants';
import DeltaObject from '../../typedef/DeltaObject';

/**
 * @param {string} strEntityName - Entity name the delta is occurring for.
 * @param {string} strIdentifier - Identifier for the delta.
 * @param {object} objPayload - Data payload for the delta.
 * @returns {DeltaObject} Delta object.
 * @throws {Error} If enitity name or action identifier is empty.
 */
export default (strEntityName, strIdentifier, objPayload = {}) => {
  if (isEmpty(strEntityName)) {
    throw new Error('Entity name must not be empty.');
  }

  if (isEmpty(strIdentifier)) {
    throw new Error('Identifier must not be empty.');
  }

  return {
    [KEY_ENTITY_NAME]: strEntityName,
    [KEY_IDENTIFER]: strIdentifier,
    [KEY_PAYLOAD]: objPayload,
  };
};

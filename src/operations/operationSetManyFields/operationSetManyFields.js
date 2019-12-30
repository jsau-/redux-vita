import isPlainObject from 'lodash/isPlainObject';
import IDENTIFIER_SET_MANY_FIELDS from './identifier';
import Operation from '../../Operation';
import deltaCreator from '../../util/deltaCreator';

export default (strEntityName) => new Operation(
  strEntityName,
  IDENTIFIER_SET_MANY_FIELDS,
  // Delta creator
  (objFieldsToSet) => {
    if (!isPlainObject(objFieldsToSet)) {
      throw new Error('Fields must be a plain object.');
    }

    return deltaCreator(strEntityName, IDENTIFIER_SET_MANY_FIELDS, { objFieldsToSet });
  },
  // Delta handler
  (uobjCurrentReducerState, objOccurringDeltaPayload) => {
    const { objFieldsToSet } = objOccurringDeltaPayload;

    if (!isPlainObject(objFieldsToSet)) {
      throw new Error('Fields must be a plain object.');
    }

    return {
      ...uobjCurrentReducerState,
      ...objFieldsToSet,
    };
  },
);

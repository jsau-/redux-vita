import isEmpty from 'lodash/isEmpty';
import IDENTIFIER_SET_FIELD from './identifier';
import Operation from '../../Operation';
import deltaCreator from '../../util/deltaCreator';

export default (strEntityName) => new Operation(
  strEntityName,
  IDENTIFIER_SET_FIELD,
  // Delta creator
  (strFieldToSet, mixedFieldValue) => {
    if (isEmpty(strFieldToSet)) {
      throw new Error('No field to set was provided.');
    }

    return deltaCreator(strEntityName, IDENTIFIER_SET_FIELD, { mixedFieldValue, strFieldToSet });
  },
  // Delta handler
  (uobjCurrentReducerState, objOccurringDeltaPayload) => {
    const { mixedFieldValue, strFieldToSet } = objOccurringDeltaPayload;

    if (isEmpty(strFieldToSet)) {
      throw new Error('No field to set was provided.');
    }

    return {
      ...uobjCurrentReducerState,
      [strFieldToSet]: mixedFieldValue,
    };
  },
);

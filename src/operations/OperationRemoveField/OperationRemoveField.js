import isEmpty from 'lodash/isEmpty';
import IDENTIFIER_REMOVE_FIELD from './identifier';
import Operation from '../../Operation';
import deltaCreator from '../../util/deltaCreator';

export default (strEntityName) => new Operation(
  strEntityName,
  IDENTIFIER_REMOVE_FIELD,
  // Delta creator
  (strFieldToRemove) => {
    if (isEmpty(strFieldToRemove)) {
      throw new Error('No field to remove was provided.');
    }

    return deltaCreator(strEntityName, IDENTIFIER_REMOVE_FIELD, { strFieldToRemove });
  },
  // Delta handler
  (uobjCurrentReducerState, objOccurringDeltaPayload) => {
    const { strFieldToRemove } = objOccurringDeltaPayload;

    if (isEmpty(strFieldToRemove)) {
      throw new Error('No field to remove was provided.');
    }

    const {
      [strFieldToRemove]: mixedValueToRemove,
      ...objReducerStateWithoutRemovedField
    } = uobjCurrentReducerState;

    return objReducerStateWithoutRemovedField;
  },
);

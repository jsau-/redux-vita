import operationSetField from '.';
import IDENTIFIER_SET_FIELD from './identifier';
import { KEY_ENTITY_NAME, KEY_IDENTIFER, KEY_PAYLOAD } from '../../util/deltaCreator/constants';
import deltaCreator from '../../util/deltaCreator';

describe('operationSetField', () => {
  it('Should throw on creating deltas with no field to set', () => {
    const strEntityName = 'entity_name';
    const opSetField = operationSetField(strEntityName);

    expect(() => opSetField.createDelta()).toThrow('No field to set was provided.');
  });

  it('Should generate delta objects', () => {
    const strEntityName = 'entity_name';
    const strFieldToSet = 'field_to_set';
    const mixedFieldValue = 'field_value';

    const opSetField = operationSetField(strEntityName);

    const objCreatedDelta = opSetField.createDelta(strFieldToSet, mixedFieldValue);

    expect(objCreatedDelta).toEqual({
      [KEY_ENTITY_NAME]: strEntityName,
      [KEY_IDENTIFER]: IDENTIFIER_SET_FIELD,
      [KEY_PAYLOAD]: { mixedFieldValue, strFieldToSet },
    });
  });

  it('Should throw on processing deltas with no field to set', () => {
    const strEntityName = 'entity_name';
    const opSetField = operationSetField(strEntityName);

    const objCreatedDelta = deltaCreator(
      strEntityName,
      IDENTIFIER_SET_FIELD,
      {},
    );

    expect(() => opSetField.getReducerStateAfterProcessingDelta(undefined, objCreatedDelta))
      .toThrow('No field to set was provided.');
  });

  it('Should set a previously non-existent field', () => {
    const strEntityName = 'entity_name';
    const strFieldToSet = 'field_to_set';
    const mixedFieldValue = 'field_value';

    const objInitialReducerState = {};
    const objExpectedReducerState = { [strFieldToSet]: mixedFieldValue };

    const opSetField = operationSetField(strEntityName);

    const objCreatedDelta = opSetField.createDelta(strFieldToSet, mixedFieldValue);

    const objReducerStateAfterProcessingDelta = opSetField.getReducerStateAfterProcessingDelta(
      objInitialReducerState,
      objCreatedDelta,
    );

    expect(objReducerStateAfterProcessingDelta).toEqual(objExpectedReducerState);
  });

  it('Should over-write a previously existing field', () => {
    const strEntityName = 'entity_name';
    const strFieldToSet = 'field_to_set';
    const mixedFieldValue = 'field_value';

    const objInitialReducerState = { [strFieldToSet]: 'previous_value_to_overwrite' };
    const objExpectedReducerState = { [strFieldToSet]: mixedFieldValue };

    const opSetField = operationSetField(strEntityName);

    const objCreatedDelta = opSetField.createDelta(strFieldToSet, mixedFieldValue);

    const objReducerStateAfterProcessingDelta = opSetField.getReducerStateAfterProcessingDelta(
      objInitialReducerState,
      objCreatedDelta,
    );

    expect(objReducerStateAfterProcessingDelta).toEqual(objExpectedReducerState);
  });
});

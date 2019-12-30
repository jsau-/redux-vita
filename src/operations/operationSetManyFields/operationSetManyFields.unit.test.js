import operationSetManyFields from '.';
import IDENTIFIER_SET_MANY_FIELDS from './identifier';
import {
  KEY_ENTITY_NAME,
  KEY_IDENTIFER,
  KEY_PAYLOAD,
  KEY_TYPE,
} from '../../util/deltaCreator/constants';
import deltaCreator from '../../util/deltaCreator';

describe('operationSetManyFields', () => {
  it('Should throw on creating deltas without plain objects', () => {
    const strEntityName = 'entity_name';
    const opSetManyFields = operationSetManyFields(strEntityName);

    expect(() => opSetManyFields.createDelta()).toThrow('Fields must be a plain object.');
  });

  it('Should generate delta objects', () => {
    const strEntityName = 'entity_name';
    const objFieldsToSet = { field_a: 1, field_b: 2 };

    const opSetManyFields = operationSetManyFields(strEntityName);

    const objCreatedDelta = opSetManyFields.createDelta(objFieldsToSet);

    expect(objCreatedDelta).toEqual({
      [KEY_ENTITY_NAME]: strEntityName,
      [KEY_IDENTIFER]: IDENTIFIER_SET_MANY_FIELDS,
      [KEY_PAYLOAD]: { objFieldsToSet },
      [KEY_TYPE]: `reduxvita_autogenerated_${strEntityName}_${IDENTIFIER_SET_MANY_FIELDS}`,
    });
  });

  it('Should throw on processing deltas without fields to set', () => {
    const strEntityName = 'entity_name';
    const opSetManyFields = operationSetManyFields(strEntityName);

    const objCreatedDelta = deltaCreator(
      strEntityName,
      IDENTIFIER_SET_MANY_FIELDS,
      {},
    );

    expect(() => opSetManyFields.getReducerStateAfterProcessingDelta(undefined, objCreatedDelta))
      .toThrow('Fields must be a plain object.');
  });

  it('Should set previously non-existent fields', () => {
    const strEntityName = 'entity_name';
    const objFieldsToSet = { field_a: 1, field_b: 2 };

    const objInitialReducerState = { field_c: 3 };

    const objExpectedReducerState = {
      field_a: 1,
      field_b: 2,
      field_c: 3,
    };

    const opSetManyFields = operationSetManyFields(strEntityName);

    const objCreatedDelta = opSetManyFields.createDelta(objFieldsToSet);

    const objReducerStateAfterProcessingDelta = opSetManyFields.getReducerStateAfterProcessingDelta(
      objInitialReducerState,
      objCreatedDelta,
    );

    expect(objReducerStateAfterProcessingDelta).toEqual(objExpectedReducerState);
  });

  it('Should set overwrite previously existing fields', () => {
    const strEntityName = 'entity_name';
    const objFieldsToSet = { field_a: 11, field_b: 22 };

    const objInitialReducerState = {
      field_a: 1,
      field_b: 2,
      field_c: 3,
    };

    const objExpectedReducerState = {
      field_a: 11,
      field_b: 22,
      field_c: 3,
    };

    const opSetManyFields = operationSetManyFields(strEntityName);

    const objCreatedDelta = opSetManyFields.createDelta(objFieldsToSet);

    const objReducerStateAfterProcessingDelta = opSetManyFields.getReducerStateAfterProcessingDelta(
      objInitialReducerState,
      objCreatedDelta,
    );

    expect(objReducerStateAfterProcessingDelta).toEqual(objExpectedReducerState);
  });
});

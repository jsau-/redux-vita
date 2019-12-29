import operationRemoveField from '.';
import IDENTIFIER_REMOVE_FIELD from './identifier';
import { KEY_ENTITY_NAME, KEY_IDENTIFER, KEY_PAYLOAD } from '../../util/deltaCreator/constants';
import deltaCreator from '../../util/deltaCreator';

describe('RemoveField', () => {
  it('Should throw on creating deltas with no field to remove', () => {
    const strEntityName = 'entity_name';
    const opRemoveField = operationRemoveField(strEntityName);

    expect(() => opRemoveField.createDelta()).toThrow('No field to remove was provided.');
  });

  it('Should generate delta objects', () => {
    const strEntityName = 'entity_name';
    const strFieldToRemove = 'field_to_remove';
    const opRemoveField = operationRemoveField(strEntityName);

    const objCreatedDelta = opRemoveField.createDelta(strFieldToRemove);

    expect(objCreatedDelta).toEqual({
      [KEY_ENTITY_NAME]: strEntityName,
      [KEY_IDENTIFER]: IDENTIFIER_REMOVE_FIELD,
      [KEY_PAYLOAD]: { strFieldToRemove },
    });
  });

  it('Should throw on processing deltas with no field to remove', () => {
    const strEntityName = 'entity_name';
    const opRemoveField = operationRemoveField(strEntityName);

    const objOccurringDelta = deltaCreator(
      strEntityName,
      IDENTIFIER_REMOVE_FIELD,
      {},
    );

    expect(() => opRemoveField.getReducerStateAfterProcessingDelta(undefined, objOccurringDelta))
      .toThrow('No field to remove was provided.');
  });

  it('Shouldn\'t affect reducer state if no matching field was found', () => {
    const strEntityName = 'entity_name';
    const strFieldToRemove = 'field_to_remove';
    const opRemoveField = operationRemoveField(strEntityName);

    const objDeltaRemoveField = opRemoveField.createDelta(strFieldToRemove);

    const objInitialReducerState = { existing_field: 1 };

    const objReducerStateAfterHandlingDelta = opRemoveField.getReducerStateAfterProcessingDelta(
      objInitialReducerState,
      objDeltaRemoveField,
    );

    expect(objReducerStateAfterHandlingDelta).toEqual(objInitialReducerState);
  });

  it('Should remove the field from reducer state if found', () => {
    const strEntityName = 'entity_name';
    const strFieldToRemove = 'field_to_remove';
    const opRemoveField = operationRemoveField(strEntityName);

    const objDeltaRemoveField = opRemoveField.createDelta(strFieldToRemove);

    const objInitialReducerState = { [strFieldToRemove]: 1 };

    const objReducerStateAfterHandlingDelta = opRemoveField.getReducerStateAfterProcessingDelta(
      objInitialReducerState,
      objDeltaRemoveField,
    );

    expect(objReducerStateAfterHandlingDelta).toEqual({});
  });
});

import OperationRemoveField from '.';
import IDENTIFIER_REMOVE_FIELD from './identifier';
import { KEY_ENTITY_NAME, KEY_IDENTIFER, KEY_PAYLOAD } from '../../util/deltaCreator/constants';
import deltaCreator from '../../util/deltaCreator';

describe('RemoveField', () => {
  it('Should throw on creating deltas with no field to remove', () => {
    const strEntityName = 'entity_name';
    const operationRemoveField = new OperationRemoveField(strEntityName);

    expect(() => operationRemoveField.createDelta()).toThrow('No field to remove was provided.');
  });

  it('Should generate delta objects', () => {
    const strEntityName = 'entity_name';
    const strFieldToRemove = 'field_to_remove';
    const operationRemoveField = new OperationRemoveField(strEntityName);

    const objCreatedDelta = operationRemoveField.createDelta(strFieldToRemove);

    expect(objCreatedDelta).toEqual({
      [KEY_ENTITY_NAME]: strEntityName,
      [KEY_IDENTIFER]: IDENTIFIER_REMOVE_FIELD,
      [KEY_PAYLOAD]: { strFieldToRemove },
    });
  });

  it('Should throw on processing deltas with no field to remove', () => {
    const strEntityName = 'entity_name';
    const operationRemoveField = new OperationRemoveField(strEntityName);

    const objOccurringDelta = deltaCreator(
      strEntityName,
      IDENTIFIER_REMOVE_FIELD,
      {},
    );

    expect(() => operationRemoveField.getReducerStateAfterProcesssingDelta(undefined, objOccurringDelta))
      .toThrow('No field to remove was provided.');
  });

  it('Shouldn\'t affect reducer state if no matching field was found', () => {
    const strEntityName = 'entity_name';
    const strFieldToRemove = 'field_to_remove';
    const operationRemoveField = new OperationRemoveField(strEntityName);

    const objDeltaRemoveField = operationRemoveField.createDelta(strFieldToRemove);

    const objInitialReducerState = { existing_field: 1 };

    const objReducerStateAfterHandlingDelta = operationRemoveField.getReducerStateAfterProcesssingDelta(
      objInitialReducerState,
      objDeltaRemoveField,
    );

    expect(objReducerStateAfterHandlingDelta).toEqual(objInitialReducerState);
  });

  it('Should remove the field from reducer state if found', () => {
    const strEntityName = 'entity_name';
    const strFieldToRemove = 'field_to_remove';
    const operationRemoveField = new OperationRemoveField(strEntityName);

    const objDeltaRemoveField = operationRemoveField.createDelta(strFieldToRemove);

    const objInitialReducerState = { [strFieldToRemove]: 1 };

    const objReducerStateAfterHandlingDelta = operationRemoveField.getReducerStateAfterProcesssingDelta(
      objInitialReducerState,
      objDeltaRemoveField,
    );

    expect(objReducerStateAfterHandlingDelta).toEqual({});
  });
});

import isDeltaObjectRelevantToOperation from '.';
import deltaCreator from '../deltaCreator';

describe('isDeltaObjectRelevantToOperation', () => {
  it('Should be false for deltas for different entities', () => {
    const strOperationEntityName = 'op_entity_name';
    const strOperationIdentifier = 'op_identifier';

    const objDelta = deltaCreator('not_op_entity_name', strOperationEntityName);

    expect(
      isDeltaObjectRelevantToOperation(strOperationEntityName, strOperationIdentifier, objDelta),
    ).toBe(false);
  });

  it('Should be false for deltas for different identifiers', () => {
    const strOperationEntityName = 'op_entity_name';
    const strOperationIdentifier = 'op_identifier';

    const objDelta = deltaCreator(strOperationEntityName, 'not_op_identifier');

    expect(
      isDeltaObjectRelevantToOperation(strOperationEntityName, strOperationIdentifier, objDelta),
    ).toBe(false);
  });

  it('Should be true for matching both entity and identifier', () => {
    const strOperationEntityName = 'op_entity_name';
    const strOperationIdentifier = 'op_identifier';

    const objDelta = deltaCreator(strOperationEntityName, strOperationIdentifier);

    expect(
      isDeltaObjectRelevantToOperation(strOperationEntityName, strOperationIdentifier, objDelta),
    ).toBe(true);
  });
});

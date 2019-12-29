import deltaCreator from '.';
import { KEY_ENTITY_NAME, KEY_IDENTIFER, KEY_PAYLOAD } from './constants';

describe('deltaCreator', () => {
  it('Should throw if entity name is empty', () => {
    expect(() => deltaCreator())
      .toThrow('Entity name must not be empty.');
  });

  it('Should generate a delta object with type and entity name', () => {
    const strEntityName = 'entity_name';
    const strIdentifier = 'action_identifier';

    const objCreatedDelta = deltaCreator(strEntityName, strIdentifier);

    const {
      [KEY_ENTITY_NAME]: strCreatedEntityName,
      [KEY_IDENTIFER]: strCreatedIdentifier,
    } = objCreatedDelta;

    expect(strCreatedEntityName).toEqual(strEntityName);
    expect(strCreatedIdentifier).toEqual(strIdentifier);
  });

  it('Should generate a delta object with default empty data payload', () => {
    const { [KEY_PAYLOAD]: objCreatedDeltaPayload } = deltaCreator(
      'entity_name',
      'action_identifier',
    );

    expect(objCreatedDeltaPayload).toEqual({});
  });

  it('Should generate a delta object with a provided data payload', () => {
    const objProvidedPayload = {
      field_a: 1,
      field_b: 2,
    };

    const { [KEY_PAYLOAD]: objCreatedDeltaPayload } = deltaCreator(
      'entity_name',
      'action_identifier',
      objProvidedPayload,
    );

    expect(objCreatedDeltaPayload).toEqual(objProvidedPayload);
  });
});

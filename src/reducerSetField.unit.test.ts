import { reducerSetField } from './reducerSetField';

describe('reducerSetField', () => {
  it('Should set a field', () => {
    const strFieldName = 'field_to_set';
    const mixedFieldValue = 'field_set_value';

    const objInitialState = { other_field_one: 1, other_field_two: 2 };
    const objExpectedState = {
      other_field_one: 1,
      other_field_two: 2,
      [strFieldName]: mixedFieldValue,
    };

    expect(
      reducerSetField(objInitialState, strFieldName, mixedFieldValue),
    ).toEqual(objExpectedState);
  });

  it('Should overwrite an existing field', () => {
    const strFieldName = 'field_to_set';
    const mixedFieldValue = 'field_set_value';

    const objInitialState = {
      other_field_one: 1,
      other_field_two: 2,
      [strFieldName]: 'old_field_value',
    };
    const objExpectedState = {
      other_field_one: 1,
      other_field_two: 2,
      [strFieldName]: mixedFieldValue,
    };

    expect(
      reducerSetField(objInitialState, strFieldName, mixedFieldValue),
    ).toEqual(objExpectedState);
  });
});

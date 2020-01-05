import { reducerIncrementField } from './reducerIncrementField';

describe('reducerIncrementField', () => {
  it('Should throw on field not existing', () => {
    const strFieldName = 'field_not_exist';

    expect(() => reducerIncrementField({}, 'field_not_exist')).toThrow(
      `Field '${strFieldName}' does not exist on current state, and hence cannot be incremented.`,
    );
  });

  it('Should throw on field not being a number', () => {
    const strFieldName = 'field_not_number';
    const mixedFieldValue = 'not_a_number';

    const objReducerState = { [strFieldName]: mixedFieldValue };

    expect(() => reducerIncrementField(objReducerState, strFieldName)).toThrow(
      `Invalid type for incrementing field '${strFieldName}'. Expected 'number', got 'string'`,
    );
  });

  it('Should increment a field', () => {
    const strFieldName = 'field_to_increment';
    const intInitialValue = 100;

    const objInitialState = {
      other_field_one: 1,
      other_field_two: 2,
      [strFieldName]: intInitialValue,
    };
    const objExpectedState = {
      other_field_one: 1,
      other_field_two: 2,
      [strFieldName]: intInitialValue + 1,
    };

    expect(reducerIncrementField(objInitialState, strFieldName)).toEqual(
      objExpectedState,
    );
  });
});

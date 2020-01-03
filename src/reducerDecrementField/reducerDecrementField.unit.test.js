import reducerDecrementField from '.';

describe('reducerDecrementField', () => {
  it('Should throw on field not existing', () => {
    const strFieldName = 'field_not_exist';

    expect(() => reducerDecrementField({}, 'field_not_exist'))
      .toThrow(`Field '${strFieldName}' does not exist on current state, and hence cannot be decremented.`);
  });

  it('Should throw on field not being a number', () => {
    const strFieldName = 'field_not_number';
    const mixedFieldValue = 'not_a_number';

    const objReducerState = { [strFieldName]: mixedFieldValue };

    expect(() => reducerDecrementField(objReducerState, strFieldName))
      .toThrow(`Invalid type for decrementing field '${strFieldName}'. Expected 'number', got 'string'`);
  });

  it('Should decrement a field', () => {
    const strFieldName = 'field_to_decrement';
    const intInitialValue = 100;

    const objInitialState = { other_field_one: 1, other_field_two: 2, [strFieldName]: intInitialValue };
    const objExpectedState = { other_field_one: 1, other_field_two: 2, [strFieldName]: intInitialValue - 1 };

    expect(reducerDecrementField(objInitialState, strFieldName)).toEqual(objExpectedState);
  });
});

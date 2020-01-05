import reducerToggleBooleanField from '.';

describe('reducerToggleBooleanField', () => {
  it('Should throw on field not existing', () => {
    const strFieldName = 'field_not_exist';

    expect(() => reducerToggleBooleanField({}, 'field_not_exist'))
      .toThrow(`Field '${strFieldName}' does not exist on current state, and hence cannot be toggled.`);
  });

  it('Should throw on field not being a boolean', () => {
    const strFieldName = 'field_not_boolean';
    const mixedFieldValue = 'not_a_boolean';

    const objReducerState = { [strFieldName]: mixedFieldValue };

    expect(() => reducerToggleBooleanField(objReducerState, strFieldName))
      .toThrow(`Invalid type for toggling field '${strFieldName}'. Expected 'boolean', got 'string'`);
  });

  it('Should toggle a boolean field', () => {
    const strFieldName = 'field_to_toggle';
    const bInitialValue = true;

    const objInitialState = { other_field_one: 1, other_field_two: 2, [strFieldName]: bInitialValue };
    const objExpectedState = { other_field_one: 1, other_field_two: 2, [strFieldName]: !bInitialValue };

    expect(reducerToggleBooleanField(objInitialState, strFieldName)).toEqual(objExpectedState);
  });
});

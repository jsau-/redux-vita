import { reducerToggleBooleanField } from './reducerToggleBooleanField';

describe('reducerToggleBooleanField', () => {
  it('Should throw on field not existing', () => {
    const fieldName = 'field_not_exist';

    expect(() => reducerToggleBooleanField({}, 'field_not_exist')).toThrow(
      `Field '${fieldName}' does not exist on current state, and hence cannot \
be toggled.`,
    );
  });

  it('Should throw on field not being a boolean', () => {
    const fieldName = 'field_not_boolean';
    const fieldValue = 'not_a_boolean';

    const reducerState = { [fieldName]: fieldValue };

    expect(() => reducerToggleBooleanField(reducerState, fieldName)).toThrow(
      `Invalid type for toggling field '${fieldName}'. Expected 'boolean', \
got 'string'`,
    );
  });

  it('Should toggle a boolean field', () => {
    const fieldName = 'field_to_toggle';
    const initialValue = true;

    const objInitialState = {
      [fieldName]: initialValue,
      otherFieldOne: 1,
      otherFieldTwo: 2,
    };
    const objExpectedState = {
      [fieldName]: !initialValue,
      otherFieldOne: 1,
      otherFieldTwo: 2,
    };

    expect(reducerToggleBooleanField(objInitialState, fieldName)).toEqual(
      objExpectedState,
    );
  });
});

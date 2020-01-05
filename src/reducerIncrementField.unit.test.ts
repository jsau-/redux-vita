import { reducerIncrementField } from './reducerIncrementField';

describe('reducerIncrementField', () => {
  it('Should throw on field not existing', () => {
    const fieldName = 'field_not_exist';

    expect(() => reducerIncrementField({}, 'field_not_exist')).toThrow(
      `Field '${fieldName}' does not exist on current state, and hence cannot \
be incremented.`,
    );
  });

  it('Should throw on field not being a number', () => {
    const fieldName = 'field_not_number';
    const fieldValue = 'not_a_number';

    const reducerState = { [fieldName]: fieldValue };

    expect(() => reducerIncrementField(reducerState, fieldName)).toThrow(
      `Invalid type for incrementing field '${fieldName}'. Expected 'number', \
got 'string'`,
    );
  });

  it('Should increment a field', () => {
    const fieldName = 'field_to_increment';
    const initialValue = 100;

    const reducerState = {
      [fieldName]: initialValue,
      otherFieldOne: 1,
      otherFieldTwo: 2,
    };

    const expectedState = {
      [fieldName]: initialValue + 1,
      otherFieldOne: 1,
      otherFieldTwo: 2,
    };

    expect(reducerIncrementField(reducerState, fieldName)).toEqual(
      expectedState,
    );
  });
});

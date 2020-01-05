import { reducerDecrementField } from './reducerDecrementField';

describe('reducerDecrementField', () => {
  it('Should throw on field not existing', () => {
    const fieldName = 'field_not_exist';

    expect(() => reducerDecrementField({}, 'field_not_exist')).toThrow(
      `Field '${fieldName}' does not exist on current state, and hence cannot \
be decremented.`,
    );
  });

  it('Should throw on field not being a number', () => {
    const fieldName = 'field_not_number';
    const fieldValue = 'not_a_number';

    const reducerState = { [fieldName]: fieldValue };

    expect(() => reducerDecrementField(reducerState, fieldName)).toThrow(
      `Invalid type for decrementing field '${fieldName}'. Expected 'number', \
got 'string'`,
    );
  });

  it('Should decrement a field', () => {
    const fieldName = 'field_to_decrement';
    const initialValue = 100;

    const initialState = {
      [fieldName]: initialValue,
      otherFieldOne: 1,
      otherFieldTwo: 2,
    };
    const expectedState = {
      [fieldName]: initialValue - 1,
      otherFieldOne: 1,
      otherFieldTwo: 2,
    };

    expect(reducerDecrementField(initialState, fieldName)).toEqual(
      expectedState,
    );
  });
});

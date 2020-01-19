import { reducerSetField } from './reducerSetField';

describe('reducerSetField', () => {
  it('Should set a field', () => {
    const fieldName = 'field_to_set';
    const fieldValue = 'field_set_value';

    const initialState = { fieldOne: 1, fieldTwo: 2 };

    const expectedState = {
      [fieldName]: fieldValue,
      fieldOne: 1,
      fieldTwo: 2,
    };

    expect(reducerSetField(initialState, fieldName, fieldValue)).toEqual(
      expectedState,
    );
  });

  it('Should overwrite an existing field', () => {
    const fieldName = 'field_to_set';
    const fieldValue = 'field_set_value';

    const initialState = {
      [fieldName]: 'old_field_value',
      fieldOne: 1,
      fieldTwo: 2,
    };
    const expectedState = {
      [fieldName]: fieldValue,
      fieldOne: 1,
      fieldTwo: 2,
    };

    expect(reducerSetField(initialState, fieldName, fieldValue)).toEqual(
      expectedState,
    );
  });
});

import setManyFields from '.';

describe('setManyFields', () => {
  it('Should set previously missing fields', () => {
    const objInitialReducerState = { field_a: 1, field_b: 2 };
    const objFieldsToSet = { field_c: 3, field_d: 4 };

    const objExpectedReducerState = {
      field_a: 1,
      field_b: 2,
      field_c: 3,
      field_d: 4,
    };

    expect(setManyFields(objInitialReducerState, objFieldsToSet)).toEqual(objExpectedReducerState);
  });

  it('Should overwrite existing fields', () => {
    const objInitialReducerState = { field_a: 1, field_b: 2, field_c: 3 };
    const objFieldsToSet = { field_b: 4, field_c: 5 };

    const objExpectedReducerState = {
      field_a: 1,
      field_b: 4,
      field_c: 5,
    };

    expect(setManyFields(objInitialReducerState, objFieldsToSet)).toEqual(objExpectedReducerState);
  });
});

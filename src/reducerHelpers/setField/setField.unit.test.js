import setField from '.';

describe('setField', () => {
  it('Should set a previously missing field', () => {
    const strFieldToSet = 'new_field';
    const mixedFieldValue = 2;

    const objInitialReducerState = { existing_field: 1 };
    const objExpectedReducerState = { existing_field: 1, [strFieldToSet]: mixedFieldValue };

    expect(setField(objInitialReducerState, strFieldToSet, mixedFieldValue)).toEqual(objExpectedReducerState);
  });

  it('Should overwrite existing fields', () => {
    const strFieldToSet = 'new_field';
    const mixedFieldValue = 3;

    const objInitialReducerState = { existing_field: 1, [strFieldToSet]: 2 };
    const objExpectedReducerState = { existing_field: 1, [strFieldToSet]: mixedFieldValue };

    expect(setField(objInitialReducerState, strFieldToSet, mixedFieldValue)).toEqual(objExpectedReducerState);
  });
});

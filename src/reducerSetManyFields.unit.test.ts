import { reducerSetManyFields } from './reducerSetManyFields';

describe('reducerSetManyFields', () => {
  it('Should set non-existing fields', () => {
    const objInitialState = { oldfield_one: 1, oldfield_two: 2 };
    const objFieldsToSet = { newfield_one: 3, newfield_two: 4 };

    const objExpectedState = {
      newfield_one: 3,
      newfield_two: 4,
      oldfield_one: 1,
      oldfield_two: 2,
    };

    expect(reducerSetManyFields(objInitialState, objFieldsToSet)).toEqual(
      objExpectedState,
    );
  });

  it('Should overwrite existing fields', () => {
    const objInitialState = {
      fieldtoleave_one: 1,
      fieldtoleave_two: 2,
      fieldtoreplace_one: 3,
      fieldtoreplace_two: 4,
    };

    const objFieldsToSet = { fieldtoreplace_one: 33, fieldtoreplace_two: 44 };

    const objExpectedState = {
      fieldtoleave_one: 1,
      fieldtoleave_two: 2,
      fieldtoreplace_one: 33,
      fieldtoreplace_two: 44,
    };

    expect(reducerSetManyFields(objInitialState, objFieldsToSet)).toEqual(
      objExpectedState,
    );
  });

  it('Should return current state on no fields to set', () => {
    const objInitialState = { oldfield_one: 1, oldfield_two: 2 };
    expect(reducerSetManyFields(objInitialState, {})).toEqual(objInitialState);
  });
});

import { reducerSetManyFields } from './reducerSetManyFields';

describe('reducerSetManyFields', () => {
  it('Should set non-existing fields', () => {
    const initialState = { oldFieldOne: 1, oldFieldTwo: 2 };
    const fieldsToSet = { newFieldOne: 3, newFieldTwo: 4 };

    const expectedState = {
      newFieldOne: 3,
      newFieldTwo: 4,
      oldFieldOne: 1,
      oldFieldTwo: 2,
    };

    expect(reducerSetManyFields(initialState, fieldsToSet)).toEqual(
      expectedState,
    );
  });

  it('Should overwrite existing fields', () => {
    const initialState = {
      fieldToLeaveOne: 1,
      fieldToLeaveTwo: 2,
      fieldToReplaceOne: 3,
      fieldToReplaceTwo: 4,
    };

    const fieldsToSet = { fieldToReplaceOne: 33, fieldToReplaceTwo: 44 };

    const expectedState = {
      fieldToLeaveOne: 1,
      fieldToLeaveTwo: 2,
      fieldToReplaceOne: 33,
      fieldToReplaceTwo: 44,
    };

    expect(reducerSetManyFields(initialState, fieldsToSet)).toEqual(
      expectedState,
    );
  });

  it('Should return current state on no fields to set', () => {
    const initialState = { oldFieldOne: 1, oldFieldTwo: 2 };
    expect(reducerSetManyFields(initialState, {})).toEqual(initialState);
  });
});

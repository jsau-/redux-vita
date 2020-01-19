import { reducerRemoveManyFields } from './reducerRemoveManyFields';

describe('reducerRemoveManyFields', () => {
  it('Should remove set fields', () => {
    const fieldsToRemove = ['fieldToRemoveOne', 'fieldToRemoveTwo'];

    const initialState = {
      fieldToRemoveOne: 'to_remove',
      fieldToRemoveTwo: 'to_remove',
      otherFieldOne: 1,
      otherFieldTwo: 2,
    };

    const expectedState = { otherFieldOne: 1, otherFieldTwo: 2 };

    expect(reducerRemoveManyFields(initialState, fieldsToRemove)).toEqual(
      expectedState,
    );
  });

  it("Shouldn't affect state without the field", () => {
    const fieldsToRemove = ['fieldToRemove'];
    const initialState = { otherFieldOne: 1, otherFieldTwo: 2 };
    expect(reducerRemoveManyFields(initialState, fieldsToRemove)).toEqual(
      initialState,
    );
  });
});

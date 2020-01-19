import { reducerRemoveField } from './reducerRemoveField';

describe('reducerRemoveField', () => {
  it('Should remove a set field', () => {
    const fieldName = 'field_to_remove';

    const initialState = {
      [fieldName]: 'to_remove',
      otherFieldOne: 1,
      otherFieldTwo: 2,
    };

    const expectedState = { otherFieldOne: 1, otherFieldTwo: 2 };

    expect(reducerRemoveField(initialState, fieldName)).toEqual(expectedState);
  });

  it("Shouldn't affect state without the field", () => {
    const fieldName = 'field_to_remove';
    const initialState = { otherFieldOne: 1, otherFieldTwo: 2 };
    expect(reducerRemoveField(initialState, fieldName)).toEqual(initialState);
  });
});

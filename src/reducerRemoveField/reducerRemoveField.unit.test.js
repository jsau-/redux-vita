import reducerRemoveField from '.';

describe('reducerRemoveField', () => {
  it('Should remove a set field', () => {
    const strFieldName = 'field_to_remove';
    const objInitialState = { other_field_one: 1, other_field_two: 2, [strFieldName]: 'to_remove' };
    const objExpectedState = { other_field_one: 1, other_field_two: 2 };
    expect(reducerRemoveField(objInitialState, strFieldName)).toEqual(objExpectedState);
  });

  it('Shouldn\'t affect state without the field', () => {
    const strFieldName = 'field_to_remove';
    const objInitialState = { other_field_one: 1, other_field_two: 2 };
    expect(reducerRemoveField(objInitialState, strFieldName)).toEqual(objInitialState);
  });
});

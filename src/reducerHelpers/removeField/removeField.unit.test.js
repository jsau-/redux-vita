import removeField from '.';

describe('removeField', () => {
  it('Should remove a set field', () => {
    const objInitialReducerState = { field_to_keep: 1, field_to_remove: 2 };
    const objExpectedReducerState = { field_to_keep: 1 };

    expect(removeField(objInitialReducerState, 'field_to_remove')).toEqual(objExpectedReducerState);
  });

  it('Shouldn\'t have effect if field not found', () => {
    const objInitialReducerState = { field_to_keep: 1 };
    const objExpectedReducerState = objInitialReducerState;

    expect(removeField(objInitialReducerState, 'field_to_remove')).toEqual(objExpectedReducerState);
  });
});

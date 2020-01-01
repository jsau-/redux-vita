import clearAll from '.';

describe('clearAll', () => {
  it('Should return the identity object literal', () => {
    expect(clearAll()).toEqual({});
  });
});

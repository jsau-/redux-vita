import Operation from '.';

describe('Operation', () => {
  it('Should cache ctor params on instantiation', () => {
    const strIdentifier = 'identifier';
    const funcDeltaCreator = () => 1;
    const funcDeltaHandler = () => 2;

    const operation = new Operation(strIdentifier, funcDeltaCreator, funcDeltaHandler);

    expect(operation.strIdentifier).toBe(strIdentifier);
    expect(operation.funcDeltaCreator).toBe(funcDeltaCreator);
    expect(operation.funcDeltaHandler).toBe(funcDeltaHandler);
  });

  it('Should throw if no operation identifier provided', () => {
    expect(() => new Operation()).toThrow('Operation identifier cannot be empty.');
  });

  it('Should return the operation identifier', () => {
    const strIdentifier = 'identifier';
    const funcDeltaCreator = () => 1;
    const funcDeltaHandler = () => 2;

    const operation = new Operation(strIdentifier, funcDeltaCreator, funcDeltaHandler);

    expect(operation.getIdentifer()).toBe(strIdentifier);
  });

  it('Should create a delta object', () => {
    const strIdentifier = 'identifier';

    const objMockReturnedDeltaObject = { field: 1 };
    const mockFuncDeltaCreator = jest.fn();
    mockFuncDeltaCreator.mockReturnValueOnce(objMockReturnedDeltaObject);

    const funcDeltaHandler = () => 2;

    const operation = new Operation(strIdentifier, mockFuncDeltaCreator, funcDeltaHandler);

    const objCreatedDeltaObject = operation.createDelta(1, 2, 3);

    // Validate delta creator function has been called
    expect(mockFuncDeltaCreator).toHaveBeenCalledTimes(1);

    // Validate varargs passed to delta creator function have been passed
    expect(mockFuncDeltaCreator.mock.calls[0][0]).toBe(1);
    expect(mockFuncDeltaCreator.mock.calls[0][1]).toBe(2);
    expect(mockFuncDeltaCreator.mock.calls[0][2]).toBe(3);

    // Validate we return the expected generated delta object
    expect(objCreatedDeltaObject).toBe(objMockReturnedDeltaObject);
  });

  it('Should process delta objects', () => {
    const strIdentifier = 'identifier';
    const funcDeltaCreator = () => 1;

    const objMockReturnedReducerState = { field: 1 };
    const mockFuncDeltaHandler = jest.fn();
    mockFuncDeltaHandler.mockReturnValueOnce(objMockReturnedReducerState);

    const operation = new Operation(strIdentifier, funcDeltaCreator, mockFuncDeltaHandler);

    const objCurrentReducerState = { existing_field: 1 };
    const objOccurringDelta = { delta_field: 1 };

    const objReducerStateAfterProcessing = operation.getReducerStateAfterProcesssingDelta(
      objCurrentReducerState,
      objOccurringDelta,
    );

    // Validate delta handler function has been called
    expect(mockFuncDeltaHandler).toHaveBeenCalledTimes(1);

    // Validate params were passed to delta handler
    expect(mockFuncDeltaHandler.mock.calls[0][0]).toBe(objCurrentReducerState);
    expect(mockFuncDeltaHandler.mock.calls[0][1]).toBe(objOccurringDelta);

    // Validate we returned the expected reducer state after processing the delta
    expect(objReducerStateAfterProcessing).toBe(objMockReturnedReducerState);
  });
});

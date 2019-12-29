import Operation from '.';
import deltaCreator from '../util/deltaCreator';
import isDeltaObjectRelevantToOperation from '../util/isDeltaObjectRelevantToOperation';

jest.mock('../util/isDeltaObjectRelevantToOperation', () => jest.fn());

describe('Operation', () => {
  beforeEach(() => {
    isDeltaObjectRelevantToOperation.mockReset();
  });

  it('Should cache ctor params on instantiation', () => {
    const strEntityName = 'entity_name';
    const strIdentifier = 'identifier';
    const funcDeltaCreator = () => 1;
    const funcDeltaHandler = () => 2;

    const operation = new Operation(strEntityName, strIdentifier, funcDeltaCreator, funcDeltaHandler);

    expect(operation.strEntityName).toBe(strEntityName);
    expect(operation.strIdentifier).toBe(strIdentifier);
    expect(operation.funcDeltaCreator).toBe(funcDeltaCreator);
    expect(operation.funcDeltaHandler).toBe(funcDeltaHandler);
  });

  it('Should throw if no operation identifier provided', () => {
    expect(() => new Operation()).toThrow('Operation entity name cannot be empty.');
  });

  it('Should throw if no operation identifier provided', () => {
    expect(() => new Operation('entity_name')).toThrow('Operation identifier cannot be empty.');
  });

  it('Should return the operation identifier', () => {
    const strEntityName = 'entity_name';
    const strIdentifier = 'identifier';
    const funcDeltaCreator = () => 1;
    const funcDeltaHandler = () => 2;

    const operation = new Operation(strEntityName, strIdentifier, funcDeltaCreator, funcDeltaHandler);

    expect(operation.getIdentifer()).toBe(strIdentifier);
  });

  it('Should create a delta object', () => {
    const strEntityName = 'entity_name';
    const strIdentifier = 'identifier';

    const objMockReturnedDeltaObject = { field: 1 };
    const mockFuncDeltaCreator = jest.fn();
    mockFuncDeltaCreator.mockReturnValueOnce(objMockReturnedDeltaObject);

    const funcDeltaHandler = () => 2;

    const operation = new Operation(strEntityName, strIdentifier, mockFuncDeltaCreator, funcDeltaHandler);

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

  it('Should return current state for irrelevant delta objects', () => {
    const strEntityName = 'entity_name';
    const strIdentifier = 'identifier';
    const funcDeltaCreator = () => 1;
    const funcDeltaHandler = () => 2;

    const operation = new Operation(strEntityName, strIdentifier, funcDeltaCreator, funcDeltaHandler);

    isDeltaObjectRelevantToOperation.mockReturnValueOnce(false);

    const objInitialReducerState = { existing_field: 1 };
    const objOccurringDelta = { delta_field: 1 };

    const objReducerStateAfterProcessing = operation.getReducerStateAfterProcessingDelta(
      objInitialReducerState,
      objOccurringDelta,
    );

    // Validate we checked delta was relevant
    expect(isDeltaObjectRelevantToOperation).toHaveBeenCalledTimes(1);

    // Validate we returned the existing reducer state
    expect(objReducerStateAfterProcessing).toBe(objInitialReducerState);
  });

  it('Should process delta objects for relevant entity names', () => {
    const strEntityName = 'entity_name';
    const strIdentifier = 'identifier';
    const funcDeltaCreator = () => 1;

    isDeltaObjectRelevantToOperation.mockReturnValueOnce(true);

    const objMockReturnedReducerState = { field: 1 };
    const mockFuncDeltaHandler = jest.fn();
    mockFuncDeltaHandler.mockReturnValueOnce(objMockReturnedReducerState);

    const operation = new Operation(strEntityName, strIdentifier, funcDeltaCreator, mockFuncDeltaHandler);

    const objCurrentReducerState = { existing_field: 1 };

    const objOccurringDeltaPayload = { delta_payload_field: 1 };
    const objOccurringDelta = deltaCreator(strEntityName, strIdentifier, objOccurringDeltaPayload);

    const objReducerStateAfterProcessing = operation.getReducerStateAfterProcessingDelta(
      objCurrentReducerState,
      objOccurringDelta,
    );

    // Validate we checked delta was relevant
    expect(isDeltaObjectRelevantToOperation).toHaveBeenCalledTimes(1);

    // Validate delta handler function has been called
    expect(mockFuncDeltaHandler).toHaveBeenCalledTimes(1);

    // Validate params were passed to delta handler
    expect(mockFuncDeltaHandler.mock.calls[0][0]).toBe(objCurrentReducerState);
    expect(mockFuncDeltaHandler.mock.calls[0][1]).toBe(objOccurringDeltaPayload);

    // Validate we returned the expected reducer state after processing the delta
    expect(objReducerStateAfterProcessing).toBe(objMockReturnedReducerState);
  });
});

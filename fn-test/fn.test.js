it("should create an empty mock", () => {
  const mockFunction = jest.fn();
  const actual = mockFunction();
  //expect(actual === undefined).toBe(true);
  expect(actual).toBeUndefined();
});

it("should control return values with an implementation", () => {
  const expected = "value";
  const mockFunction = jest.fn(() => expected);
  const actual = mockFunction();
  expect(actual).toBe(expected);
});

it("should control return values with mockImplementation", () => {
  const expected = "value";
  const mockFunction = jest.fn();
  mockFunction.mockImplementation(() => expected);
  const actual = mockFunction();
  expect(actual).toBe(expected);
});

it("should keep track of how often it was called", () => {
  const mockFunction = jest.fn();
  expect(mockFunction.mock.calls.length).toBe(0);
  expect(mockFunction).toHaveBeenCalledTimes(0);
  mockFunction("value");
  expect(mockFunction.mock.calls.length).toBe(1);
  expect(mockFunction).toHaveBeenCalled();
  expect(mockFunction.mock.calls[0]).toEqual(["value"]);
  expect(mockFunction).toHaveBeenCalledWith("value");
});

it("should keep track of invocation call order", () => {
  const firstMock = jest.fn();
  const secondMock = jest.fn();
  firstMock();
  secondMock();
  expect(firstMock.mock.invocationCallOrder[0]).toBeLessThan(
    secondMock.mock.invocationCallOrder[0]
  );
  // jest-extended includes toHaveBeenCalledBefore
  // https://github.com/jest-community/jest-extended#tohavebeencalledbefore
});

it("should keep track of instances", () => {
  const mockFunction = jest.fn();
  const instanceEmpty = new mockFunction();
  const instanceValue = new mockFunction("value");
  expect(instanceEmpty).toBe(mockFunction.mock.instances[0]);
  expect(instanceValue).toBe(mockFunction.mock.instances[1]);
  // expect(instanceValue).toBe(instanceEmpty); // fails
  expect(mockFunction.mock.instances.length).toBe(2);
});

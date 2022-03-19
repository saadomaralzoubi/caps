"use strict";

const { faker } = require("@faker-js/faker");
const vendor = require("../apps/vendor");
const driver = require("../apps/driver");

describe("Events test", () => {
  let consoleSpy;

  let newOrder = {
    store: "saad store",
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };
  let testPayload = {
    event: "pickUp",
    time: new Date().toISOString(),
    payload: newOrder,
  };

  jest.useFakeTimers();

  beforeAll(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });
  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it(" new order", () => {
    vendor.newOrder();
    expect(consoleSpy).toHaveBeenCalled();
  });
  it("driver picks up 1 second", () => {
    driver.pickUp(testPayload);
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    }, 1000);
  });
  it("driver delivers 3 second", () => {
    driver.delivered(testPayload);
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenLastCalledWith(expect.any(Function), 3000);
    }, 3000);
  });
  it("vendor send thank you", () => {
    vendor.thank(testPayload);
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenLastCalledWith(expect.any(Function), 3000);
    }, 3000);
  });
});

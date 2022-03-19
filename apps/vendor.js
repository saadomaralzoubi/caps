"use strict";

const events = require("../lib/events");

const { faker } = require("@faker-js/faker");

function createOrder() {
  let order = {
    store: "saad store",
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };
  return order;
}

function newOrder() {
  console.log("New order is ready to pickup");
  events.emit("pickUp", {
    event: "pickUp",
    time: new Date().toISOString(),
    payload: createOrder(),
  });
}
function thank(payload) {
  payload.event = "delivered";
  payload.time = new Date().toISOString();

  console.log(`VENDOR: Thank you for delivering ${payload.payload.orderID}`);

  console.log("EVENT", payload);
}

module.exports = {
  newOrder,
  thank,
};

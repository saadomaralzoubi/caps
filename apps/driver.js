"use strict";

const events = require("../lib/events");




function pickUp(payload) {
  console.log("EVENT ", payload);
  console.log(`DRIVER : picked up ${payload.payload.orderID}`);

  setTimeout(() => {
    events.emit("inTransit", payload);
  }, 1000);
}

function delivered(payload) {
  payload.event = "inTransit";
  payload.time = new Date().toISOString();
  console.log("EVENT", payload);

  setTimeout(() => {
    console.log(`DRIVER : delivered up ${payload.payload.orderID}`);

    events.emit("delivered", payload);
  }, 3000);
}


module.exports = { pickUp, delivered };

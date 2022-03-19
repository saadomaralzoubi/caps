'use strict';


const events = require('./lib/events');
const vendor = require('./apps/vendor');
const driver = require ('./apps/driver.js');

setInterval(()=>{

  vendor.newOrder();

},5000);

events.on('pickUp', driver.pickUp);
events.on('inTransit',driver.delivered);
events.on('delivered', vendor.thank);
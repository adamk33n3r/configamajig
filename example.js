'use strict';

var configamajig = require('.');

var config = configamajig('./examples');

console.log('Resulting config:');
console.log(JSON.stringify(config, null, 4));

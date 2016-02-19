'use strict';

var assert = require('assert');
var configamajig = require('.');

function aassert(condition, message) {
    if (!condition) {
        message || (message = "Assertion failed");
        throw new Error(message);
    }
}

var config = configamajig('./examples');

console.log('Resulting config:');
console.log(JSON.stringify(config, null, 4));

console.log();

console.log('config.domain should be ("http://dev")');
assert.equal(config.domain, 'http://dev');
console.log('Passed!');

console.log('config.domain should be (1337)');
assert.equal(config.port, 1337);
console.log('Passed!');

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.log('config.development should be (true)');
    assert.equal(config.development, true);
} else if (process.env.NODE_ENV === 'production') {
    console.log('config.production should be (true)');
    assert.equal(config.production, true);
} else {
    console.log('config.default should be (true)');
    assert.equal(config.default, true);
}
console.log('All tests passed!');

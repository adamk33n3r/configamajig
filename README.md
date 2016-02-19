# Configamajig
Load configuration files with environment and local overrides!

The priorities from low to high are `default.json -> <environment>.json -> local.json`. You will generally want to have `local.json` in your `.gitignore` is this will be the place for devs to override the config options they want.
## Usage
In this example we have a project structure like this:
```
|-- config
|   |-- default.json
|   |-- local.json
|   `-- production.json
`-- script.js
```
Specify your defaults in `default.json`. They will be the the final values if nothing overrides them.
#### default.json
```json
{
    "port": 8080
}
```
You can specify environment config files. They correspond to whatever is set in the `NODE_ENV` environment variable. For example if `NODE_ENV === 'production'` this file would be loaded and override the port in `default.json`.
#### production.json
```json
{
    "port": 80
}
```
Here is where we can override all default and environment config options. If we are a 1337 haxor we can make the port `1337` on our machine.
#### local.json
```json
{
    "port": 1337
}
```
Here we require Configamajig and use the default config directory of `./config`. If you wish to specify a different directory you can just pass it as a parameter.
#### script.js
```javascript
var config = require('configamajig')();
// Same as
// var config = require('configamajig')('./config');

// Simple echo url server using port from config.
require('http').createServer(function (req, res) {
    console.log(req.url);
    res.write(req.url);
    res.end();
}).listen(config.port);
```
Play around with the configs in `examples/` and run `node example.js` to see the effects.

## Installation
`$ npm install configamajig`
## Test
`$ npm test`

'use strict';

var fs = require('fs');
var path = require('path');
var extend = require('extend');

function getConfig(configPath, configName) {
    var filePath = path.join(process.cwd(), configPath, configName);
    try {
        fs.accessSync(filePath, fs.F_OK);
        return require(filePath);
    } catch (e) {
        return {};
    }
}

function configamajig(configPath) {
    // Default configPath
    configPath || (configPath = './config');

    // Get default config
    var defaultConfig = getConfig(configPath, 'default.json');

    // Get env config
    var env = process.env.NODE_ENV || 'development';
    var envConfig = getConfig(configPath, env + '.json');

    // Get local overrides
    var localConfig = getConfig(configPath, 'local.json');

    return extend(defaultConfig, envConfig, localConfig);
}


module.exports = configamajig;

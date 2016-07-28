'use strict';

var fs = require('fs');
var path = require('path');
var extend = require('extend');

function getConfig(configPath, configName) {
    configName || (configName = '');
    var filePath = path.join(configPath, configName);
    if (configPath.startsWith('.')) {
        filePath = './' + filePath;
    }
    try {
        fs.accessSync(filePath, fs.F_OK);
        return require(filePath);
    } catch (e) {
        return {};
    }
}

function configamajig(configPath, configOverride) {
    // Default configPath
    configPath || (configPath = './config');
    configOverride || (configOverride = {});

    // If an array is passed in for configPath then treat it as a list of
    // configs to load.
    if (Object.prototype.toString.call(configPath) === '[object Array]') {
        var configs = configPath.map(function (path) {
            return getConfig(path);
        });

        return extend.apply(null, [true].concat(configs.concat(configOverride)));
    } else {
        // Get default config
        var defaultConfig = getConfig(configPath, 'default.json');

        // Get env config
        var env = process.env.NODE_ENV || 'development';
        var envConfig = getConfig(configPath, env + '.json');

        // Get local overrides
        var localConfig = getConfig(configPath, 'local.json');

        return extend(true, defaultConfig, envConfig, localConfig, configOverride);
    }
}


module.exports = configamajig;

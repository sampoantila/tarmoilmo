var default_config = require('./config.json');

try {
    // try to read locals if one exists
    var local_config = require('./config.local.json');
}
catch (err) {
}

var config = { ...default_config, ...local_config };

module.exports = config;

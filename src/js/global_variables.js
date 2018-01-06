let config = require('./env_config.js');
let exported = module.exports = Object.assign({}, config);

exported.reset = function(propertyName) {
    for(arg in arguments){
        let each = arguments[arg];
        exported[each] = config[each];
    }
}


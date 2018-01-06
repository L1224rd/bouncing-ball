let config = require('./env_config.js');
let global = module.exports = Object.assign({}, config);

global.reset = function() { // sets the property to it's envConfig value
    for(arg in arguments){ // loop through the arguments 
        let each = arguments[arg];
        global[each] = config[each];
    }
}


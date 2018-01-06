let exported = module.exports = {};
let global = require('./global_variables');

exported.playSound = function(wall) {
    if (global.volume > 0.169 || wall) { // if sound's volume is too small don't play it at all
        let sound = document.getElementById('audio-ball'); // gets html audio tag

        /* sets the volume based on the height of the fall 
        and how many loops the program did */
        sound.volume = global.volume - global.loops / 25000;
        sound.currentTime = 0; // stop current sound before playing another one
        sound.play(); // play the sound when the ball hits the ground or wall
    } else { // if the ball is rolling on the ground (not jumping any more)
        if (global.frictionFlag === 0) global.hAcceleration *= 2.5;
        // increase friction because ball is in contant contact with the ground
        global.frictionFlag = 1; // do this just one time
    }
}
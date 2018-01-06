require('!style-loader!css-loader!../style.css'); // load style.css file to be parsed inside the bundles.js

let scenario = require('./scenario'); // scenario module
let mouse = require('./mouse.js'); // mouse events module
let moviment = require('./moviment.js'); // moviment module

function init(scene = false) { // adds eventlisteners to DOM elements
    window.addEventListener('resize', scenario.setBallSize); // sets the ball size dynamicly
    window.addEventListener('mouseup', moviment.dropBall); // drop the ball
    window.addEventListener('mousemove', mouse.setMouseCoords); // drag the ball and follow the mouse position
    document.getElementById('ball').addEventListener('mousedown', moviment.grabBall); // grab ball
    if (scene) scenario.backScene(); // puts an background image on the page
    scenario.setBallSize(); // resize ball on init  
}

init();


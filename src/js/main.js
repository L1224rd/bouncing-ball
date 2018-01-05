require('!style-loader!css-loader!../style.css'); // load style.css file to be parsed inside the bundles.js
let envConfig = require('./env_config.js'); // enviroment config (heart of the app)
let config = Object.assign({}, envConfig);
let ball = document.getElementById('ball').style;

function init(scene = false){ // adds eventlisteners to DOM elements
    window.addEventListener('resize', setBallSize); // sets the ball size dynamicly
    window.addEventListener('mouseup', mouseoff); // drop the ball
    window.addEventListener('mousemove', setMouseCoords); // drag the ball and follow the mouse position
    document.getElementById('ball').addEventListener('mousedown', grabBall); // grab ball
    if(scene) backScene(); // puts an background image on the page
    setBallSize(); // resize ball on init
}

function getMouseSpeed(date) {

    /* gets lastMouseXArray, wich has the last mouse positions and dates,
    loops through it and pushs into res the elements added to the array
    200ms before ball drop. Then checks the first and last elements of
    res to see how many pixels the mouse "ran" in 200ms and then
    mouseSpeed in px/s */

    let l = config.lastMouseXArray;
    let res = [];

    l.forEach((each) => {
        if (date - each.date < 200) res.push(each.x);
    });

    let result = res[res.length - 1] - res[0];

    return result > 0 ? result : -result;
}

function getMouseDirection() {

    /* gets the last 2 mouse positions on lastMouseXArray, if element 1 
    is less than 2, the mouse is going right, else left... */

    let l = config.lastMouseXArray;
    if (l[l.length - 2].x <= l[l.length - 1].x) return 1; //right
    return 0; //left
}

function setMouseCoords(e) {

    /* fires every time the mouse moves on the window, sets mousePos with 
    the mouse coords and populates lastMouseXArray with mouse position and date,
    leaving the array with 100 max length*/

    let l = config.lastMouseXArray;
    config.mousePos = { x: e.clientX, y: e.clientY };
    if (l.length >= 100) l.shift();
    let d = new Date();
    l.push({
        x: e.clientX,
        date: d
    });
}

function backScene(){ // adds an image as background
    document.body.style.backgroundImage = "url('https://images.freeimages.com/images/large-previews/132/yellow-road-1354805.jpg')";
    document.body.style.backgroundPositionY = "-290px";
    document.getElementById('ground').style.visibility = "hidden";
}

function setBallSize() { // sets ball's width and height to 5% of the body width
    ball.width = '5%';
    ball.height = (5 * document.body.clientWidth) / 100;
}

function grabBall() {

    config.g = envConfig.g;                             // restart config variables
    config.hAcceleration = envConfig.hAcceleration;     // to it's original value
    config.loops = config.hSpeed = config.volume = 0;   //

    let bodyWidth = document.body.clientWidth;
    let bodyHeight = document.body.clientHeight;
    config.mouseon = 1; // indicates that the mousedown was fired

    setTimeout(() => {
        // recursive function that makes the ball follow the mouse as if the user was holding it

        if (config.mousePos.y > bodyHeight * 0.03 && config.mousePos.x > bodyWidth * 0.03)
        ball.top = ((config.mousePos.y * 100) / bodyHeight - 2.5) + '%';

        /* 0.03 is a limit so the ball only follow the mouse on the delimitted rectangle
        to avoid bugs, 2.5 is the ball radius, so the mouse "grabs" the mouse on its center */

        if (config.mousePos.y > bodyHeight * 0.03 && config.mousePos.x > bodyWidth * 0.03)
        ball.left = ((config.mousePos.x * 100) / bodyWidth - 2.5) + '%';

        // sets the volume of the ball sound based on the "drop" y position

        config.volume = (((config.mousePos.y * 100) / bodyHeight - 2.5) / 100) >= 0 
        ? 1 - (((config.mousePos.y * 100) / bodyHeight - 2.5) / 100) : 1;

        /* mouseon starts as 0, becomes 1 when the ball is clicked and
        stays 1 until mouseup is fired on the window */

        if (config.mouseon === 1) grabBall();

    }, 5); // the recursive function needs to have a timeout of at least 1
           // so the app doesn't crash... 
}

function mouseoff() {
    if (config.mouseon === 1) { // if th mouse is was been pressed
        config.mouseon = 0; // indicates that the user released the mouse

        // gets the mouse speed and apply it to the ball horizontal speed
        config.hSpeed = getMouseSpeed(new Date()) / 1000;
        
        /* if mouse is going left change horizontal 
        speed and accelaration to negative */
        if (getMouseDirection() == 0) {
            config.hSpeed *= -1;
            config.hAcceleration *= -1;
        }

        // call fall function passing the actual ball position in '%'
        // using the slice method to just the position number (13% => 13) 
        fall(+ball.left.slice(0, ball.left.length - 1), +ball.top.slice(0, ball.top.length - 1));
    }
}

function fall(x = 0, y = 0) { // if no argument is passed, the ball starts
                              //  at the top left of the window
    ball.transform = 'rotate(' + x * 12 + 'deg)';
    if (x >= config.rightWall || x <= config.leftWall) {
        x += x >= config.rightWall ? -1 : 1;
        playSound(1);
        config.hSpeed *= -0.9;
        config.hAcceleration *= -1;
    }

    if (config.hSpeed < config.lowLimit && config.hSpeed > -config.lowLimit) {
        config.hSpeed = 0;
        if (config.volume < 0.169) {
            y = config.ground;
            return;
        }
    } else {
        config.hSpeed += config.hAcceleration;
    }
    ball.left = x + '%';
    config.g += 0.01;
    config.loops++;
    setTimeout(() => {
        ball.top = y + '%';
        if (y < config.ground) {
            fall(x + config.hSpeed, y + config.g);
        } else {
            playSound();
            jump(x + config.hSpeed);
        }
    }, config.vSpeed);
}


function jump(x, y = config.ground) {
    ball.transform = 'rotate(' + x * 12 + 'deg)';
    if (x >= config.rightWall || x <= config.leftWall) {
        x += x >= config.rightWall ? -1 : 1;
        playSound(1);
        config.hSpeed *= -0.9;
        config.hAcceleration *= -1;

    }

    if (config.hSpeed < config.lowLimit && config.hSpeed > -config.lowLimit) {
        config.hSpeed = 0;
        if (config.volume < 0.169) {
            y = config.ground;
            return;
        }
    } else {
        config.hSpeed += config.hAcceleration;
    }
    ball.left = x + '%';
    config.g -= 0.014;
    config.loops++;
    setTimeout(() => {
        ball.top = y + '%';
        if (config.g >= 0) {
            jump(x + config.hSpeed, y - config.g);
        } else {
            fall(x + config.hSpeed, y);
            config.volume = (100 - y) / 100;
        }
    }, config.vSpeed);
}

function playSound(wall) {
    if (config.volume > 0.169 || wall) {
        let sound = document.getElementById('audio-ball');
        sound.volume = config.volume - config.loops / 25000;
        sound.currentTime = 0;
        sound.play();
    } else {
        if (config.frictionFlag === 0) config.hAcceleration *= 2.5;
        config.frictionFlag = 1;
    }
}

// backScene();
// fall();
init();


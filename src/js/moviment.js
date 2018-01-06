let moviment = module.exports = {};
let global = require('./global_variables.js'); // get global variables
let sound = require('./sound.js'); // sound module
let mouse = require('./mouse.js'); // mouse events module
let ball = document.getElementById('ball').style; // get html ball div

moviment.grabBall = function () {

    global.hSpeed = global.volume = 0;
    global.reset('g', 'hAcceleration', 'loops');

    let bodyWidth = document.body.clientWidth;
    let bodyHeight = document.body.clientHeight;
    global.mouseon = 1; // indicates that the mousedown was fired

    setTimeout(() => {
        // recursive function that makes the ball follow the mouse as if the user was holding it

        ball.top = ((mouse.mousePos.y * 100) / bodyHeight - 2.5) + '%';

        /* 0.03 is a limit so the ball only follow the mouse on the delimitted rectangle
        to avoid bugs, 2.5 is the ball radius, so the mouse "grabs" the mouse on its center */

        ball.left = ((mouse.mousePos.x * 100) / bodyWidth - 2.5) + '%';

        // sets the volume of the ball sound based on the "drop" y position

        global.volume = (((mouse.mousePos.y * 100) / bodyHeight - 2.5) / 100) >= 0
            ? 1 - (((mouse.mousePos.y * 100) / bodyHeight - 2.5) / 100) : 1;

        /* mouseon starts as 0, becomes 1 when the ball is clicked and
        stays 1 until mouseup is fired on the window */

        if (global.mouseon === 1) moviment.grabBall();

    }, 5); // the recursive function needs to have a timeout of at least 1
    // so the app doesn't crash... 
}

moviment.dropBall = function () {
    if (global.mouseon === 1) { // if th mouse is was been pressed
        global.mouseon = 0; // indicates that the user released the mouse

        // gets the mouse speed and apply it to the ball horizontal speed
        global.hSpeed = mouse.getMouseSpeed(new Date()).x / 1000;
        global.g = mouse.getMouseSpeed(new Date()).y / 500;

        /* if mouse is going left change horizontal 
        speed and accelaration to negative */
        if (mouse.getMouseDirection().x == 0) {
            global.hSpeed *= -1;
            global.hAcceleration *= -1;
        }

        // call fall function passing the current ball position in '%'
        // using the slice method to just the position number (13% => 13) 
        if (mouse.getMouseDirection().y == 1) {
            moviment.jump(+ball.left.slice(0, ball.left.length - 1), +ball.top.slice(0, ball.top.length - 1));
        } else {
            moviment.fall(+ball.left.slice(0, ball.left.length - 1), +ball.top.slice(0, ball.top.length - 1));
        }
    }
}

moviment.kinematic = function (x, y) {
    ball.transform = 'rotate(' + x * 12 + 'deg)'; // rotates the ball on its own axis
    if (x >= global.rightWall || x <= global.leftWall) { // when ball hits the wall
        x = x >= global.rightWall ? global.rightWall - 0.1 : global.leftWall + 0.1; // set x to 0.1% away from the wall to avoid bugs
        sound.playSound(1);
        global.hSpeed *= -0.9;      // change ball direction
        global.hAcceleration *= -1; // and reduces it's speed a bit
    }

    if (global.hSpeed < global.lowLimit && global.hSpeed > -global.lowLimit) { // if ball gets very slow
        global.hSpeed = 0; // stop ball horizontally
        if (global.volume < 0.169) return false;
        // if ball is too low returns 1 so fall/jump will stop the ball vertically
    } else { // if the ball is not too slow reduce it's speed
        global.hSpeed += global.hAcceleration;
    }
    ball.left = x + '%'; // move the ball to x
    global.loops++; // "loops" increases on fall and jump, it's used to set sound volume
    return x;
}

moviment.fall = function (x = 0, y = 0) {
    /* if no argument is passed, the ball starts
    at the top left of the window */
    x = moviment.kinematic(x, y); // sets fall's x to kinematic's x
    if (x === false) { // if kinematic returns false 
        y = global.ground; // stop the ball vertically
        return; // break functions fall and jump
    }
    setTimeout(() => { // needs timeout so the recursive functions don't crash the app
        global.g += global.gravity; // "gravity" (speed will be increasing until it reaches the ground)
        ball.top = y + '%'; // position the ball
        if (y < global.ground) { // if the ball hasn't hit the ground
            moviment.fall(x + global.hSpeed, y + global.g); // continue falling and going horizontally
        } else { // when ball hits the ground
            sound.playSound();
            moviment.jump(x + global.hSpeed); // call jump passing ball's current x position
        }
    }, global.vSpeed); // speed of the program (the more the slower)
}


moviment.jump = function (x, y = global.ground) {
    /* if there is no y argument the function was called from fall
    wich means the ball is on the ground*/
    x = moviment.kinematic(x, y); // sets fall's x to kinematic's x
    if (x === false) { // if kinematic returns false 
        y = global.ground; // stop the ball vertically
        return; // break functions fall and jump
    }
    if(y <= 0) {
        sound.playSound(1);
        moviment.fall(x, y);
        return;
    }
    setTimeout(() => { // needs timeout so the recursive functions don't crash the app
        global.g -= global.gravity * 1.4; // "gravity" (speed will be decreasing until it gets to zero)
        ball.top = y + '%'; // position the ball
        if (global.g >= 0) { // if the ball has vertical speed
            moviment.jump(x + global.hSpeed, y - global.g); // continue going up and horizontally
        } else { // if speed reachs 0
            moviment.fall(x + global.hSpeed, y); // start falling from ball's current x and y position
            global.volume = (100 - y) / 100; // sets sound volume relative to the fall height
        }
    }, global.vSpeed); // speed of the program (the more the slower)
}
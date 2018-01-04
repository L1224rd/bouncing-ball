let ball = document.getElementById('ball').style;
let g = 0.5;
let hSpeed = 0.21;
let vSpeed = 5;
let hAcceleration = -0.0001;
let ground = 83.2;
let volume = 1;
let loops = 0;
let mousePos = { x: 0, y: 0 }
let mouseon = 0;
let rightWall = 95.3;
let leftWall = -0.5;
let lowLimit = 0.001;
let frictionFlag = 0;

function getMouseCoords(event) {
    mousePos = { x: event.clientX, y: event.clientY };
}

function setBallSize() {
    ball.width = '5%';
    ball.height = (5 * document.body.clientWidth) / 100;
}

function grabBall() {
    mouseon = 1;
    setTimeout(() => {
        ball.top = ((mousePos.y * 100) / document.body.clientHeight - 2.5) + '%';
        ball.left = ((mousePos.x * 100) / document.body.clientWidth - 2.5) + '%';
        if (mouseon === 1) grabBall();
    }, 5);
}

function mouseoff() {
    mouseon = 0;
    fall(+ball.left.slice(0, ball.left.length - 1), +ball.top.slice(0, ball.top.length - 1));
}

function takeoffPx(a) {
    let b = a.split('');
    b.pop();
    b.pop();
    return b.join('');
}

function fall(x = 0, y = 0) {
    ball.transform = 'rotate(' + x * 12 + 'deg)';
    if (x > rightWall) {
        playSound(1);
        hSpeed = -hSpeed;
        hAcceleration = -hAcceleration;
    }
    if (x < leftWall) {
        playSound(1);
        hSpeed = -hSpeed;
        hAcceleration = -hAcceleration;
    }
    if (hSpeed < lowLimit && hSpeed > -lowLimit) {
        hSpeed = 0;
        y = ground;
        return;
    }
    else {
        hSpeed += hAcceleration;
    }
    ball.left = x + '%';
    g += 0.01;
    loops++;
    setTimeout(() => {
        ball.top = y + '%';
        if (y < ground) {
            fall(x + hSpeed, y + g);
        } else {
            playSound();
            jump(x + hSpeed);
        }
    }, vSpeed);
}


function jump(x, y = ground) {
    ball.transform = 'rotate(' + x * 12 + 'deg)';
    if (x > rightWall || x < leftWall) {
        playSound(1);
        hSpeed = -hSpeed;
        hAcceleration = -hAcceleration;
    }

    if (hSpeed < lowLimit && hSpeed > -lowLimit) {
        hSpeed = 0;
        y = ground;
        return;
    }
    else {
        hSpeed += hAcceleration;
    }
    ball.left = x + '%';
    g -= 0.014;
    loops++;
    setTimeout(() => {
        ball.top = y + '%';
        if (g >= 0) {
            jump(x + hSpeed, y - g);
        } else {
            fall(x + hSpeed, y);
            volume = (100 - y) / 100;
        }
    }, vSpeed);
}

function playSound(wall) {
    if (volume > 0.1689 || wall) {
        let sound = document.getElementById('audio-ball');
        sound.volume = volume - loops / 25000;
        sound.currentTime = 0;
        sound.play();
    } else {
        if(frictionFlag === 0) hAcceleration *= 1.5;
        frictionFlag = 1;
    }
}

setBallSize();

// fall();
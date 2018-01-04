let ball = document.getElementById('ball').style;
let g = 0.5;
let hSpeed = 0.11;
let vSpeed = 5;
let hAcceleration = -0.000065;
let ground = 83.2;
let volume = 1;
let loops = 0;
let mousePos = { x: 0, y: 0 }
let mouseon = 0;

function getMouseCoords(event) {
    mousePos = { x: event.clientX, y: event.clientY };
}

function grabBall() {
    mouseon = 1;
    setTimeout(() => {
        ball.top = mousePos.y-35;
        ball.left = mousePos.x-35;
        if(mouseon === 1) grabBall();
    }, 5);
}

function mouseoff() {
    mouseon = 0;
    let height = (takeoffPx(ball.top)*100/document.body.clientHeight);
    let width = (takeoffPx(ball.left)*100/document.body.clientWidth);
    fall(width, height);
}

function takeoffPx(a){
    let b = a.split('');
    b.pop();
    b.pop();
    return b.join('');
}

function fall(x = 1, y = 0) {
    ball.transform = 'rotate(' + x * 12 + 'deg)';
    if (hSpeed > 0.007) hSpeed += hAcceleration;
    else {
        hSpeed = 0;
        y = ground;
        return;
    }
    ball.left = x + '%';
    g += 0.01;
    loops++;
    setTimeout(() => {
        ball.top = y + '%';
        if (y < ground) {
            fall(x + hSpeed, y + g);
        } else {
            playSound(x);
            jump(x + hSpeed);
        }
    }, vSpeed);
}


function jump(x, y = ground) {
    ball.transform = 'rotate(' + x * 12 + 'deg)';
    if (hSpeed > 0.007) hSpeed += hAcceleration;
    else {
        hSpeed = 0;
        y = ground;
        return;
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

function playSound() {
    let sound = document.getElementById('audio-ball');
    sound.volume = volume - loops / 25000;
    sound.currentTime = 0;
    sound.play();
}

// fall();
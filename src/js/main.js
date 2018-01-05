require('!style-loader!css-loader!../style.css');

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
let lastMouseXArray = [];

function init(scene = false){
    window.addEventListener('resize', setBallSize);
    window.addEventListener('mouseup', mouseoff);
    window.addEventListener('mousemove', setMouseCoords);
    document.getElementById('ball').addEventListener('mousedown', grabBall);
    if(scene) backScene();
    setBallSize();
}

function getMouseSpeed(date) {
    let l = lastMouseXArray;
    let res = [];
    l.forEach((each) => {
        if (date - each.date < 200) res.push(each.x);
    });
    let result = res[res.length - 1] - res[0];
    return result > 0 ? result : -result;
}

function getMouseDirection() {
    let l = lastMouseXArray;
    if (l[l.length - 2].x - l[l.length - 1].x <= 0) return 1; //right
    return 0; //left
}

function setMouseCoords(e) {
    let l = lastMouseXArray;
    mousePos = { x: e.clientX, y: e.clientY };
    if (l.length >= 100) l.shift();
    let d = new Date();
    l.push({
        x: e.clientX,
        date: d
    });
}

function backScene(){
    document.body.style.backgroundImage = "url('https://images.freeimages.com/images/large-previews/132/yellow-road-1354805.jpg')";
    document.body.style.backgroundPositionY = "-290px";
    document.getElementById('ground').style.visibility = "hidden";
}

function setBallSize() {
    ball.width = '5%';
    ball.height = (5 * document.body.clientWidth) / 100;
}

function grabBall() {
    g = 0.5;
    mouseon = 1;
    hAcceleration = -0.0001;
    loops = hSpeed = volume = 0;
    setTimeout(() => {
        if (mousePos.y > document.body.clientHeight * 0.03 && mousePos.x > document.body.clientWidth * 0.03) ball.top = ((mousePos.y * 100) / document.body.clientHeight - 2.5) + '%';
        if (mousePos.y > document.body.clientHeight * 0.03 && mousePos.x > document.body.clientWidth * 0.03) ball.left = ((mousePos.x * 100) / document.body.clientWidth - 2.5) + '%';
        volume = (((mousePos.y * 100) / document.body.clientHeight - 2.5) / 100) >= 0 ? 1 - (((mousePos.y * 100) / document.body.clientHeight - 2.5) / 100) : 1;
        if (mouseon === 1) grabBall();
    }, 5);
}

function mouseoff() {
    if (hSpeed === 0 && mouseon === 1) {
        mouseon = 0;
        hSpeed = getMouseSpeed(new Date()) / 1000;
        if (getMouseDirection() == 0) {
            hSpeed *= -1;
            hAcceleration *= -1;
        }
        fall(+ball.left.slice(0, ball.left.length - 1), +ball.top.slice(0, ball.top.length - 1));
    }
}

function fall(x = 0, y = 0) {
    ball.transform = 'rotate(' + x * 12 + 'deg)';
    if (x >= rightWall || x <= leftWall) {
        x += x >= rightWall ? -1 : 1;
        playSound(1);
        hSpeed *= -0.9;
        hAcceleration *= -1;
    }

    if (hSpeed < lowLimit && hSpeed > -lowLimit) {
        hSpeed = 0;
        if (volume < 0.169) {
            y = ground;
            return;
        }
    } else {
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
    if (x >= rightWall || x <= leftWall) {
        x += x >= rightWall ? -1 : 1;
        playSound(1);
        hSpeed *= -0.9;
        hAcceleration *= -1;

    }

    if (hSpeed < lowLimit && hSpeed > -lowLimit) {
        hSpeed = 0;
        if (volume < 0.169) {
            y = ground;
            return;
        }
    } else {
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
    if (volume > 0.169 || wall) {
        let sound = document.getElementById('audio-ball');
        sound.volume = volume - loops / 25000;
        sound.currentTime = 0;
        sound.play();
    } else {
        if (frictionFlag === 0) hAcceleration *= 2.5;
        frictionFlag = 1;
    }
}

// backScene();
// fall();
init();


var ball = document.getElementById('ball').style;
let g = 0.5;
let hSpeed = 1.7;
let vSpeed = 7;
let hAcceleration = -0.0013;


function fall(x = 30, y = 10) {
    if(hSpeed > 0) hSpeed += hAcceleration;
    else hSpeed = 0;
    ball.left = x + 'px';
    g += 0.01;
    setTimeout(() => {
        ball.top = y + '%';
        if (y < 81) {
            fall(x + hSpeed, y + g);
        } else {
            jump(x + hSpeed);
        }
    }, vSpeed);
}

function jump(x, y = 82) {
    if(hSpeed > 0) hSpeed += hAcceleration;
    ball.left = x + 'px';
    g -= 0.014;
    let last = y;
    setTimeout(() => {
        ball.top = y + '%';
        if (g >= 0) {
            jump(x + hSpeed, y - g);
        } else {
            fall(x + hSpeed, y);
        }
    }, vSpeed);
}

fall();
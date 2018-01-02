var ball = document.getElementById('ball').style;
let g = 0.5;
let hSpeed = 1.76;
let vSpeed = 7;
let hAcceleration = -0.00121;
let ground = 82.1;


function fall(x = 30, y = 0) {
    console.log(1);
    if (hSpeed > 0) hSpeed += hAcceleration;
    else hSpeed = 0;
    ball.left = x + 'px';
    g += 0.01;
    setTimeout(() => {
        ball.top = y + '%';
        if (y < ground) {
            fall(x + hSpeed, y + g);
        } else {
            jump(x + hSpeed);
        }
    }, vSpeed);
}


function jump(x, y = ground) {
    console.log(0);
    if (hSpeed > 0) hSpeed += hAcceleration;
    else hSpeed = 0;
    ball.left = x + 'px';
    g -= 0.014;
    setTimeout(() => {
        ball.top = y + '%';
        if (g >= 0) {
            jump(x + hSpeed, y - g);
        } else {
            console.log(y);
            fall(x + hSpeed, y);
        }
    }, vSpeed);
}

fall();
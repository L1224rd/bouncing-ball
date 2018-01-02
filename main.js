var ball = document.getElementById('ball').style;
let g = 0.5;
let hSpeed = 1.84;
let vSpeed = 6;
let hAcceleration = -0.00121;
let ground = 83.2;


function fall(x = 30, y = 0) {
    ball.transform = 'rotate('+x+'deg)';
    console.log(hSpeed, y);
    if (hSpeed > 0) hSpeed += hAcceleration;
    else if (y < ground) {
        hSpeed = 0;
        y = ground;
        return;
    }
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
    ball.transform = 'rotate('+x+'deg)';
    if (hSpeed > 0) hSpeed += hAcceleration;
    else if (y < ground) {
        hSpeed = 0;
        y = ground;
        return;
    }
    ball.left = x + 'px';
    g -= 0.014;
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
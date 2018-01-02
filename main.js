let ball = document.getElementById('ball').style;
let g = 0.5;
let hSpeed = 0.11;
let vSpeed = 5;
let hAcceleration = -0.000065;
let ground = 83.2;
let ballTimer = new Date();
let volume = 1;
let loops = 0;

function fall(x = 1, y = 0) {
    ball.transform = 'rotate('+x*12+'deg)';
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
    ball.transform = 'rotate('+x*12+'deg)';
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
            volume = (100-y)/100;
        }
    }, vSpeed);
}

function playSound(){
    let sound = document.getElementById('audio-ball');
    sound.volume = volume-loops/25000;
    sound.currentTime = 0;
    sound.play();
}

fall();
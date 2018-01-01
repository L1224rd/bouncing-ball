var ball = document.getElementById('ball').style;
let vSpeed = 0.01;
let vTime = 6;
let hSpeed = 2.85;
let topBall = 30;
let leftBall = 30;
let topBallFactor = 1.3;

function ballDown(y = topBall, x = leftBall) {
    vSpeed += 0.03;
    ball.left = x + 'px';
    ball.top = y + '%';
    setTimeout(() => {
        if (y < 82.1) {
            y += vSpeed;
            x += hSpeed;
            ballDown(y, x);
        } else {
            if(topBall > 40 && topBall < 65) topBallFactor += 3;
            else if(topBall > 65) topBallFactor += 1;
            topBall += topBall / topBallFactor;
            ballUp(y, x);
        }
    }, vTime);
}

function ballUp(y = 82.1, x = leftBall) {
    vSpeed -= 0.03;
    ball.left = x + 'px';
    ball.top = y + '%';
    setTimeout(() => {
        if (y > topBall/2+5) {
            y -= vSpeed;
            x += hSpeed;
            ballUp(y, x);
        } else {
            ballDown(y, x);
        }
    }, vTime);
}

ballDown();



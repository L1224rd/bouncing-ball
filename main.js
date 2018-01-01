var ball = document.getElementById('ball').style;
let vSpeed = 0.4;
let hSpeed = 1;
let topBall = 50;
let leftBall = 100;

function ballDown(y = topBall, x = leftBall) {
    ball.left = x + 'px';
    ball.top = y + '%';
    setTimeout(() => {
        if (y < 82.1) {
            y += vSpeed;
            x += hSpeed;
            ballDown(y, x);
        } else {
            topBall += 5;
            if (topBall <= 82.1) {
                setTimeout(() => {
                    ballUp(y, x);
                }, 50);
            }
        }
    }, 1);
}

function ballUp(y = 82.1, x = leftBall) {
    ball.left = x + 'px';
    ball.top = y + '%';
    setTimeout(() => {
        if (y > topBall) {
            y -= vSpeed;
            x += hSpeed;
            ballUp(y, x);
        } else {
            setTimeout(() => {
                ballDown(y, x);
            }, 10);
        }
    }, 1);
}

ballDown();



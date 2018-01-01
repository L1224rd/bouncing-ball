var ball = document.getElementById('ball').style;

function ballDown(y = 50) {
    ball.top = y + '%';
    setTimeout(() => {
        if (y < 82.1) {
            y += 0.1;
            ballDown(y);
        } else {
            ballUp();
        }
    }, 1);
}

function ballUp(y = 82.1) {
    ball.top = y + '%';
    setTimeout(() => {
        if (y > 50) {
            y -= 0.1;
            ballUp(y);
        } else {
            ballDown();
        }
    }, 1);
}

ballDown();



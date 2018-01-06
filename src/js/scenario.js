let exported = module.exports = {};
let ball = document.getElementById('ball').style;

exported.backScene = function() { // adds an image as background
    document.body.style.backgroundImage = "url('https://images.freeimages.com/images/large-previews/132/yellow-road-1354805.jpg')";
    document.body.style.backgroundPositionY = "-290px";
    document.getElementById('ground').style.visibility = "hidden";
}

exported.setBallSize = function() { // sets ball's width and height to 5% of the body width
    ball.width = '5%';
    ball.height = (5 * document.body.clientWidth) / 100;
}
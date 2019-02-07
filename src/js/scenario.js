let scenario = module.exports = {};
let ball = document.getElementById('ball').style;

scenario.backScene = function() { // adds an image as background
    document.body.style.backgroundImage = "url('https://images.freeimages.com/images/large-previews/132/yellow-road-1354805.jpg')";
    document.body.style.backgroundPositionY = "-290px";
    document.getElementById('ground').style.visibility = "hidden";
};
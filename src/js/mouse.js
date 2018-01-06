let mouse = module.exports = {};
let global = require('./global_variables.js');

mouse.getMouseSpeed = function(date) {

    /* gets lastMouseArray, wich has the last mouse positions and dates,
    loops through it and pushs, into res, the elements added to the array
    200ms before ball drop. Then checks the first and last elements of
    res to see how many pixels the mouse "ran" in 200ms and then gets it's
    speed in mouseSpeed in px/s */

    let l = global.lastMouseArray;
    let res = [];

    l.forEach((each) => {
        if (date - each.date < 200) res.push(each);
    });

    let result = {
        x: res[res.length - 1].x - res[0].x,
        y: res[res.length - 1].y - res[0].y
    }

    if(result.x < 0) result.x *= -1;
    if(result.y < 0) result.y *= -1;

    return result;
}

mouse.getMouseDirection = function() {

    /* gets the last 2 mouse positions on lastMouseArray, if element 1 
    is less than 2, the mouse is going right, else left... */

    let l = global.lastMouseArray;
    let res = {};
    if (l[l.length - 2].x <= l[l.length - 1].x) res.x = 1; //right
    else res.x = 0; //left
    if (l[l.length - 2].y >= l[l.length - 1].y) res.y = 1; //up
    else res.y = 0; //down
    return res;
}

mouse.setMouseCoords = function(e) {
    /* fires every time the mouse moves on the window, sets mousePos with 
    the mouse coords and populates lastMouseArray with mouse position and date,
    leaving the array with 100 max length*/

    let l = global.lastMouseArray;
    mouse.mousePos = { x: e.clientX, y: e.clientY };
    if (l.length >= 100) l.shift();
    let d = new Date();
    l.push({
        x: e.clientX,
        y: e.clientY,
        date: d
    });
}
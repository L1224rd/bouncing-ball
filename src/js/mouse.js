let exported = module.exports = {};
let global = require('./global_variables.js');

exported.getMouseSpeed = function(date) {

    /* gets lastMouseXArray, wich has the last mouse positions and dates,
    loops through it and pushs into res the elements added to the array
    200ms before ball drop. Then checks the first and last elements of
    res to see how many pixels the mouse "ran" in 200ms and then
    mouseSpeed in px/s */

    let l = global.lastMouseXArray;
    let res = [];

    l.forEach((each) => {
        if (date - each.date < 200) res.push(each.x);
    });

    let result = res[res.length - 1] - res[0];

    return result > 0 ? result : -result;
}

exported.getMouseDirection = function() {

    /* gets the last 2 mouse positions on lastMouseXArray, if element 1 
    is less than 2, the mouse is going right, else left... */

    let l = global.lastMouseXArray;
    if (l[l.length - 2].x <= l[l.length - 1].x) return 1; //right
    return 0; //left
}

exported.setMouseCoords = function(e) {

    /* fires every time the mouse moves on the window, sets mousePos with 
    the mouse coords and populates lastMouseXArray with mouse position and date,
    leaving the array with 100 max length*/

    let l = global.lastMouseXArray;
    exported.mousePos = { x: e.clientX, y: e.clientY };
    if (l.length >= 100) l.shift();
    let d = new Date();
    l.push({
        x: e.clientX,
        date: d
    });
}
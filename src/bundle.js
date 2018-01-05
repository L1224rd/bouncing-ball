/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

let ball = document.getElementById('ball').style;
let g = 0.5;
let hSpeed = 0.21;
let vSpeed = 5;
let hAcceleration = -0.0001;
let ground = 83.2;
let volume = 1;
let loops = 0;
let mousePos = { x: 0, y: 0 }
let mouseon = 0;
let rightWall = 95.3;
let leftWall = -0.5;
let lowLimit = 0.001;
let frictionFlag = 0;
let lastMouseXArray = [];

function init(){
    document.body.addEventListener('resize', setBallSize);
    document.body.addEventListener('mouseup', mouseoff);
    document.body.addEventListener('mousemove', setMouseCoords);
    document.getElementById('ball').addEventListener('mousedown', grabBall);
    setBallSize();
}

function getMouseSpeed(date) {
    let l = lastMouseXArray;
    let res = [];
    l.forEach((each) => {
        if (date - each.date < 200) res.push(each.x);
    });
    let result = res[res.length - 1] - res[0];
    return result > 0 ? result : -result;
}

function getMouseDirection() {
    let l = lastMouseXArray;
    if (l[l.length - 2].x - l[l.length - 1].x <= 0) return 1; //right
    return 0; //left
}

function setMouseCoords(e) {
    let l = lastMouseXArray;
    mousePos = { x: e.clientX, y: e.clientY };
    if (l.length >= 100) l.shift();
    let d = new Date();
    l.push({
        x: e.clientX,
        date: d
    });
}

function backScene(){
    document.body.style.backgroundImage = "url('https://images.freeimages.com/images/large-previews/132/yellow-road-1354805.jpg')";
    document.body.style.backgroundPositionY = "-290px";
    document.getElementById('ground').style.visibility = "hidden";
}

function setBallSize() {
    ball.width = '5%';
    ball.height = (5 * document.body.clientWidth) / 100;
}

function grabBall() {
    g = 0.5;
    mouseon = 1;
    hAcceleration = -0.0001;
    loops = hSpeed = volume = 0;
    setTimeout(() => {
        if (mousePos.y > document.body.clientHeight * 0.03 && mousePos.x > document.body.clientWidth * 0.03) ball.top = ((mousePos.y * 100) / document.body.clientHeight - 2.5) + '%';
        if (mousePos.y > document.body.clientHeight * 0.03 && mousePos.x > document.body.clientWidth * 0.03) ball.left = ((mousePos.x * 100) / document.body.clientWidth - 2.5) + '%';
        volume = (((mousePos.y * 100) / document.body.clientHeight - 2.5) / 100) >= 0 ? 1 - (((mousePos.y * 100) / document.body.clientHeight - 2.5) / 100) : 1;
        if (mouseon === 1) grabBall();
    }, 5);
}

function mouseoff() {
    if (hSpeed === 0 && mouseon === 1) {
        mouseon = 0;
        hSpeed = getMouseSpeed(new Date()) / 1000;
        if (getMouseDirection() == 0) {
            hSpeed *= -1;
            hAcceleration *= -1;
        }
        fall(+ball.left.slice(0, ball.left.length - 1), +ball.top.slice(0, ball.top.length - 1));
    }
}

function fall(x = 0, y = 0) {
    ball.transform = 'rotate(' + x * 12 + 'deg)';
    if (x >= rightWall || x <= leftWall) {
        x += x >= rightWall ? -1 : 1;
        playSound(1);
        hSpeed *= -0.9;
        hAcceleration *= -1;
    }

    if (hSpeed < lowLimit && hSpeed > -lowLimit) {
        hSpeed = 0;
        if (volume < 0.169) {
            y = ground;
            return;
        }
    } else {
        hSpeed += hAcceleration;
    }
    ball.left = x + '%';
    g += 0.01;
    loops++;
    setTimeout(() => {
        ball.top = y + '%';
        if (y < ground) {
            fall(x + hSpeed, y + g);
        } else {
            playSound();
            jump(x + hSpeed);
        }
    }, vSpeed);
}


function jump(x, y = ground) {
    ball.transform = 'rotate(' + x * 12 + 'deg)';
    if (x >= rightWall || x <= leftWall) {
        x += x >= rightWall ? -1 : 1;
        playSound(1);
        hSpeed *= -0.9;
        hAcceleration *= -1;

    }

    if (hSpeed < lowLimit && hSpeed > -lowLimit) {
        hSpeed = 0;
        if (volume < 0.169) {
            y = ground;
            return;
        }
    } else {
        hSpeed += hAcceleration;
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
            volume = (100 - y) / 100;
        }
    }, vSpeed);
}

function playSound(wall) {
    if (volume > 0.169 || wall) {
        let sound = document.getElementById('audio-ball');
        sound.volume = volume - loops / 25000;
        sound.currentTime = 0;
        sound.play();
    } else {
        if (frictionFlag === 0) hAcceleration *= 2.5;
        frictionFlag = 1;
    }
}

// backScene();
// fall();
init();



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjgxY2IzNjNiY2NiNWZjY2U5ZjAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2REFBNkQ7QUFDN0QsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyODFjYjM2M2JjY2I1ZmNjZTlmMCIsImxldCBiYWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhbGwnKS5zdHlsZTtcclxubGV0IGcgPSAwLjU7XHJcbmxldCBoU3BlZWQgPSAwLjIxO1xyXG5sZXQgdlNwZWVkID0gNTtcclxubGV0IGhBY2NlbGVyYXRpb24gPSAtMC4wMDAxO1xyXG5sZXQgZ3JvdW5kID0gODMuMjtcclxubGV0IHZvbHVtZSA9IDE7XHJcbmxldCBsb29wcyA9IDA7XHJcbmxldCBtb3VzZVBvcyA9IHsgeDogMCwgeTogMCB9XHJcbmxldCBtb3VzZW9uID0gMDtcclxubGV0IHJpZ2h0V2FsbCA9IDk1LjM7XHJcbmxldCBsZWZ0V2FsbCA9IC0wLjU7XHJcbmxldCBsb3dMaW1pdCA9IDAuMDAxO1xyXG5sZXQgZnJpY3Rpb25GbGFnID0gMDtcclxubGV0IGxhc3RNb3VzZVhBcnJheSA9IFtdO1xyXG5cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRCYWxsU2l6ZSk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZW9mZik7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHNldE1vdXNlQ29vcmRzKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWxsJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZ3JhYkJhbGwpO1xyXG4gICAgc2V0QmFsbFNpemUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TW91c2VTcGVlZChkYXRlKSB7XHJcbiAgICBsZXQgbCA9IGxhc3RNb3VzZVhBcnJheTtcclxuICAgIGxldCByZXMgPSBbXTtcclxuICAgIGwuZm9yRWFjaCgoZWFjaCkgPT4ge1xyXG4gICAgICAgIGlmIChkYXRlIC0gZWFjaC5kYXRlIDwgMjAwKSByZXMucHVzaChlYWNoLngpO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgcmVzdWx0ID0gcmVzW3Jlcy5sZW5ndGggLSAxXSAtIHJlc1swXTtcclxuICAgIHJldHVybiByZXN1bHQgPiAwID8gcmVzdWx0IDogLXJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TW91c2VEaXJlY3Rpb24oKSB7XHJcbiAgICBsZXQgbCA9IGxhc3RNb3VzZVhBcnJheTtcclxuICAgIGlmIChsW2wubGVuZ3RoIC0gMl0ueCAtIGxbbC5sZW5ndGggLSAxXS54IDw9IDApIHJldHVybiAxOyAvL3JpZ2h0XHJcbiAgICByZXR1cm4gMDsgLy9sZWZ0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldE1vdXNlQ29vcmRzKGUpIHtcclxuICAgIGxldCBsID0gbGFzdE1vdXNlWEFycmF5O1xyXG4gICAgbW91c2VQb3MgPSB7IHg6IGUuY2xpZW50WCwgeTogZS5jbGllbnRZIH07XHJcbiAgICBpZiAobC5sZW5ndGggPj0gMTAwKSBsLnNoaWZ0KCk7XHJcbiAgICBsZXQgZCA9IG5ldyBEYXRlKCk7XHJcbiAgICBsLnB1c2goe1xyXG4gICAgICAgIHg6IGUuY2xpZW50WCxcclxuICAgICAgICBkYXRlOiBkXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYmFja1NjZW5lKCl7XHJcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCdodHRwczovL2ltYWdlcy5mcmVlaW1hZ2VzLmNvbS9pbWFnZXMvbGFyZ2UtcHJldmlld3MvMTMyL3llbGxvdy1yb2FkLTEzNTQ4MDUuanBnJylcIjtcclxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWSA9IFwiLTI5MHB4XCI7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JvdW5kJykuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEJhbGxTaXplKCkge1xyXG4gICAgYmFsbC53aWR0aCA9ICc1JSc7XHJcbiAgICBiYWxsLmhlaWdodCA9ICg1ICogZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCkgLyAxMDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdyYWJCYWxsKCkge1xyXG4gICAgZyA9IDAuNTtcclxuICAgIG1vdXNlb24gPSAxO1xyXG4gICAgaEFjY2VsZXJhdGlvbiA9IC0wLjAwMDE7XHJcbiAgICBsb29wcyA9IGhTcGVlZCA9IHZvbHVtZSA9IDA7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpZiAobW91c2VQb3MueSA+IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0ICogMC4wMyAmJiBtb3VzZVBvcy54ID4gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCAqIDAuMDMpIGJhbGwudG9wID0gKChtb3VzZVBvcy55ICogMTAwKSAvIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0IC0gMi41KSArICclJztcclxuICAgICAgICBpZiAobW91c2VQb3MueSA+IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0ICogMC4wMyAmJiBtb3VzZVBvcy54ID4gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCAqIDAuMDMpIGJhbGwubGVmdCA9ICgobW91c2VQb3MueCAqIDEwMCkgLyBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIC0gMi41KSArICclJztcclxuICAgICAgICB2b2x1bWUgPSAoKChtb3VzZVBvcy55ICogMTAwKSAvIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0IC0gMi41KSAvIDEwMCkgPj0gMCA/IDEgLSAoKChtb3VzZVBvcy55ICogMTAwKSAvIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0IC0gMi41KSAvIDEwMCkgOiAxO1xyXG4gICAgICAgIGlmIChtb3VzZW9uID09PSAxKSBncmFiQmFsbCgpO1xyXG4gICAgfSwgNSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vdXNlb2ZmKCkge1xyXG4gICAgaWYgKGhTcGVlZCA9PT0gMCAmJiBtb3VzZW9uID09PSAxKSB7XHJcbiAgICAgICAgbW91c2VvbiA9IDA7XHJcbiAgICAgICAgaFNwZWVkID0gZ2V0TW91c2VTcGVlZChuZXcgRGF0ZSgpKSAvIDEwMDA7XHJcbiAgICAgICAgaWYgKGdldE1vdXNlRGlyZWN0aW9uKCkgPT0gMCkge1xyXG4gICAgICAgICAgICBoU3BlZWQgKj0gLTE7XHJcbiAgICAgICAgICAgIGhBY2NlbGVyYXRpb24gKj0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZhbGwoK2JhbGwubGVmdC5zbGljZSgwLCBiYWxsLmxlZnQubGVuZ3RoIC0gMSksICtiYWxsLnRvcC5zbGljZSgwLCBiYWxsLnRvcC5sZW5ndGggLSAxKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZhbGwoeCA9IDAsIHkgPSAwKSB7XHJcbiAgICBiYWxsLnRyYW5zZm9ybSA9ICdyb3RhdGUoJyArIHggKiAxMiArICdkZWcpJztcclxuICAgIGlmICh4ID49IHJpZ2h0V2FsbCB8fCB4IDw9IGxlZnRXYWxsKSB7XHJcbiAgICAgICAgeCArPSB4ID49IHJpZ2h0V2FsbCA/IC0xIDogMTtcclxuICAgICAgICBwbGF5U291bmQoMSk7XHJcbiAgICAgICAgaFNwZWVkICo9IC0wLjk7XHJcbiAgICAgICAgaEFjY2VsZXJhdGlvbiAqPSAtMTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaFNwZWVkIDwgbG93TGltaXQgJiYgaFNwZWVkID4gLWxvd0xpbWl0KSB7XHJcbiAgICAgICAgaFNwZWVkID0gMDtcclxuICAgICAgICBpZiAodm9sdW1lIDwgMC4xNjkpIHtcclxuICAgICAgICAgICAgeSA9IGdyb3VuZDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaFNwZWVkICs9IGhBY2NlbGVyYXRpb247XHJcbiAgICB9XHJcbiAgICBiYWxsLmxlZnQgPSB4ICsgJyUnO1xyXG4gICAgZyArPSAwLjAxO1xyXG4gICAgbG9vcHMrKztcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGJhbGwudG9wID0geSArICclJztcclxuICAgICAgICBpZiAoeSA8IGdyb3VuZCkge1xyXG4gICAgICAgICAgICBmYWxsKHggKyBoU3BlZWQsIHkgKyBnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5U291bmQoKTtcclxuICAgICAgICAgICAganVtcCh4ICsgaFNwZWVkKTtcclxuICAgICAgICB9XHJcbiAgICB9LCB2U3BlZWQpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24ganVtcCh4LCB5ID0gZ3JvdW5kKSB7XHJcbiAgICBiYWxsLnRyYW5zZm9ybSA9ICdyb3RhdGUoJyArIHggKiAxMiArICdkZWcpJztcclxuICAgIGlmICh4ID49IHJpZ2h0V2FsbCB8fCB4IDw9IGxlZnRXYWxsKSB7XHJcbiAgICAgICAgeCArPSB4ID49IHJpZ2h0V2FsbCA/IC0xIDogMTtcclxuICAgICAgICBwbGF5U291bmQoMSk7XHJcbiAgICAgICAgaFNwZWVkICo9IC0wLjk7XHJcbiAgICAgICAgaEFjY2VsZXJhdGlvbiAqPSAtMTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGhTcGVlZCA8IGxvd0xpbWl0ICYmIGhTcGVlZCA+IC1sb3dMaW1pdCkge1xyXG4gICAgICAgIGhTcGVlZCA9IDA7XHJcbiAgICAgICAgaWYgKHZvbHVtZSA8IDAuMTY5KSB7XHJcbiAgICAgICAgICAgIHkgPSBncm91bmQ7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhTcGVlZCArPSBoQWNjZWxlcmF0aW9uO1xyXG4gICAgfVxyXG4gICAgYmFsbC5sZWZ0ID0geCArICclJztcclxuICAgIGcgLT0gMC4wMTQ7XHJcbiAgICBsb29wcysrO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgYmFsbC50b3AgPSB5ICsgJyUnO1xyXG4gICAgICAgIGlmIChnID49IDApIHtcclxuICAgICAgICAgICAganVtcCh4ICsgaFNwZWVkLCB5IC0gZyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZmFsbCh4ICsgaFNwZWVkLCB5KTtcclxuICAgICAgICAgICAgdm9sdW1lID0gKDEwMCAtIHkpIC8gMTAwO1xyXG4gICAgICAgIH1cclxuICAgIH0sIHZTcGVlZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYXlTb3VuZCh3YWxsKSB7XHJcbiAgICBpZiAodm9sdW1lID4gMC4xNjkgfHwgd2FsbCkge1xyXG4gICAgICAgIGxldCBzb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdWRpby1iYWxsJyk7XHJcbiAgICAgICAgc291bmQudm9sdW1lID0gdm9sdW1lIC0gbG9vcHMgLyAyNTAwMDtcclxuICAgICAgICBzb3VuZC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgc291bmQucGxheSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoZnJpY3Rpb25GbGFnID09PSAwKSBoQWNjZWxlcmF0aW9uICo9IDIuNTtcclxuICAgICAgICBmcmljdGlvbkZsYWcgPSAxO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBiYWNrU2NlbmUoKTtcclxuLy8gZmFsbCgpO1xyXG5pbml0KCk7XHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=
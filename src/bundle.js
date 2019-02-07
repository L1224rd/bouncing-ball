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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let config = __webpack_require__(9);
let global = module.exports = Object.assign({}, config);

global.reset = function() { // sets the property to it's envConfig value
    for(arg in arguments){ // loop through the arguments 
        let each = arguments[arg];
        global[each] = config[each];
    }
}



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

let mouse = module.exports = {};
let global = __webpack_require__(0);

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3); // load style.css file to be parsed inside the bundles.js

let scenario = __webpack_require__(8); // scenario module
let mouse = __webpack_require__(1); // mouse events module
let moviment = __webpack_require__(10); // moviment module

function init(scene = false) { // adds eventlisteners to DOM elements
    window.addEventListener('mouseup', moviment.dropBall); // drop the ball
    window.addEventListener('mousemove', mouse.setMouseCoords); // drag the ball and follow the mouse position
    document.getElementById('ball').addEventListener('mousedown', moviment.grabBall); // grab ball
    if (scene) scenario.backScene(); // puts an background image on the page
}

init();



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(false);
// imports


// module
exports.push([module.i, "body {\n    margin: 0px;\n    padding: 0px;\n    background-color: skyblue;\n    overflow:hidden;\n}\n\n#ground {\n    height: 20%;\n    width: 100%;\n    display: block;\n    position: absolute;\n    top: 80%;\n    background-color: rgb(92, 85, 85);\n}\n\n#ball {\n    height: 10vh;\n    width: 10vh;    \n    display: block;\n    position: absolute;\n    top: 10%; /* 82.1%; */ \n    left: 30px;\n    border-radius: 50%;\n}\n\n#ball img {\n    height: 100%;\n    width: 100%;\n}\n\n#ball:hover {\n    cursor: pointer;\n}", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

let scenario = module.exports = {};
let ball = document.getElementById('ball').style;

scenario.backScene = function() { // adds an image as background
    document.body.style.backgroundImage = "url('https://images.freeimages.com/images/large-previews/132/yellow-road-1354805.jpg')";
    document.body.style.backgroundPositionY = "-290px";
    document.getElementById('ground').style.visibility = "hidden";
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {
    g:  0.5,
    gravity: 0.01,
    hSpeed:  0.21,
    vSpeed:  5,
    hAcceleration:  -0.0001,
    ground:  83.2,
    volume:  1,
    loops:  0,
    mousePos:  { x: 0, y: 0},
    mouseon:  0,
    rightWall:  96,
    leftWall:  -1,
    lowLimit:  0.001,
    frictionFlag:  0,
    lastMouseArray: []
}



/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

let moviment = module.exports = {};
let global = __webpack_require__(0); // get global variables
let sound = __webpack_require__(11); // sound module
let mouse = __webpack_require__(1); // mouse events module
let ball = document.getElementById('ball').style; // get html ball div

moviment.grabBall = function () {

    global.hSpeed = global.volume = 0;
    global.reset('g', 'hAcceleration', 'loops');

    let bodyWidth = document.body.clientWidth;
    let bodyHeight = document.body.clientHeight;
    global.mouseon = 1; // indicates that the mousedown was fired

    setTimeout(() => {
        // recursive function that makes the ball follow the mouse as if the user was holding it

        ball.top = ((mouse.mousePos.y * 100) / bodyHeight - 2.5) + '%';

        /* 0.03 is a limit so the ball only follow the mouse on the delimitted rectangle
        to avoid bugs, 2.5 is the ball radius, so the mouse "grabs" the mouse on its center */

        ball.left = ((mouse.mousePos.x * 100) / bodyWidth - 2.5) + '%';

        // sets the volume of the ball sound based on the "drop" y position

        global.volume = (((mouse.mousePos.y * 100) / bodyHeight - 2.5) / 100) >= 0
            ? 1 - (((mouse.mousePos.y * 100) / bodyHeight - 2.5) / 100) : 1;

        /* mouseon starts as 0, becomes 1 when the ball is clicked and
        stays 1 until mouseup is fired on the window */

        if (global.mouseon === 1) moviment.grabBall();

    }, 5); // the recursive function needs to have a timeout of at least 1
    // so the app doesn't crash... 
}

moviment.dropBall = function () {
    if (global.mouseon === 1) { // if th mouse is was been pressed
        global.mouseon = 0; // indicates that the user released the mouse

        // gets the mouse speed and apply it to the ball horizontal speed
        global.hSpeed = mouse.getMouseSpeed(new Date()).x / 1000;
        global.g = mouse.getMouseSpeed(new Date()).y / 500;

        /* if mouse is going left change horizontal 
        speed and accelaration to negative */
        if (mouse.getMouseDirection().x == 0) {
            global.hSpeed *= -1;
            global.hAcceleration *= -1;
        }

        // call fall function passing the current ball position in '%'
        // using the slice method to just the position number (13% => 13) 
        if (mouse.getMouseDirection().y == 1) {
            moviment.jump(+ball.left.slice(0, ball.left.length - 1), +ball.top.slice(0, ball.top.length - 1));
        } else {
            moviment.fall(+ball.left.slice(0, ball.left.length - 1), +ball.top.slice(0, ball.top.length - 1));
        }
    }
}

moviment.kinematic = function (x, y) {
    ball.transform = 'rotate(' + x * 12 + 'deg)'; // rotates the ball on its own axis
    if (x >= global.rightWall || x <= global.leftWall) { // when ball hits the wall
        x = x >= global.rightWall ? global.rightWall - 0.1 : global.leftWall + 0.1; // set x to 0.1% away from the wall to avoid bugs
        sound.playSound(1);
        global.hSpeed *= -0.9;      // change ball direction
        global.hAcceleration *= -1; // and reduces it's speed a bit
    }

    if (global.hSpeed < global.lowLimit && global.hSpeed > -global.lowLimit) { // if ball gets very slow
        global.hSpeed = 0; // stop ball horizontally
        if (global.volume < 0.169) return false;
        // if ball is too low returns 1 so fall/jump will stop the ball vertically
    } else { // if the ball is not too slow reduce it's speed
        global.hSpeed += global.hAcceleration;
    }
    ball.left = x + '%'; // move the ball to x
    global.loops++; // "loops" increases on fall and jump, it's used to set sound volume
    return x;
}

moviment.fall = function (x = 0, y = 0) {
    /* if no argument is passed, the ball starts
    at the top left of the window */
    x = moviment.kinematic(x, y); // sets fall's x to kinematic's x
    if (x === false) { // if kinematic returns false 
        y = global.ground; // stop the ball vertically
        return; // break functions fall and jump
    }
    setTimeout(() => { // needs timeout so the recursive functions don't crash the app
        global.g += global.gravity; // "gravity" (speed will be increasing until it reaches the ground)
        ball.top = y + '%'; // position the ball
        if (y < global.ground) { // if the ball hasn't hit the ground
            moviment.fall(x + global.hSpeed, y + global.g); // continue falling and going horizontally
        } else { // when ball hits the ground
            sound.playSound();
            moviment.jump(x + global.hSpeed); // call jump passing ball's current x position
        }
    }, global.vSpeed); // speed of the program (the more the slower)
}


moviment.jump = function (x, y = global.ground) {
    /* if there is no y argument the function was called from fall
    wich means the ball is on the ground*/
    x = moviment.kinematic(x, y); // sets fall's x to kinematic's x
    if (x === false) { // if kinematic returns false 
        y = global.ground; // stop the ball vertically
        return; // break functions fall and jump
    }
    if(y <= 0) {
        sound.playSound(1);
        moviment.fall(x, y);
        return;
    }
    setTimeout(() => { // needs timeout so the recursive functions don't crash the app
        global.g -= global.gravity * 1.4; // "gravity" (speed will be decreasing until it gets to zero)
        ball.top = y + '%'; // position the ball
        if (global.g >= 0) { // if the ball has vertical speed
            moviment.jump(x + global.hSpeed, y - global.g); // continue going up and horizontally
        } else { // if speed reachs 0
            moviment.fall(x + global.hSpeed, y); // start falling from ball's current x and y position
            global.volume = (100 - y) / 100; // sets sound volume relative to the fall height
        }
    }, global.vSpeed); // speed of the program (the more the slower)
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

let sound = module.exports = {};
let global = __webpack_require__(0);

sound.playSound = function(wall) {
    if (global.volume > 0.169 || wall) { // if sound's volume is too small don't play it at all
        let sound = document.getElementById('audio-ball'); // gets html audio tag

        /* sets the volume based on the height of the fall 
        and how many loops the program did */
        let sVolume = global.volume - global.loops / 25000;
        if(sVolume <= 1 && sVolume >= 0) {
            sound.volume = sVolume;
        }
        sound.currentTime = 0; // stop current sound before playing another one
        sound.play(); // play the sound when the ball hits the ground or wall
    } else { // if the ball is rolling on the ground (not jumping any more)
        if (global.frictionFlag === 0) global.hAcceleration *= 2.5;
        // increase friction because ball is in contant contact with the ground
        global.frictionFlag = 1; // do this just one time
    }
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjM1ZDQ5ZTQ0ZmQ5OTkzMGZjOTYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dsb2JhbF92YXJpYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vdXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5jc3M/YmQ4NCIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2NlbmFyaW8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Vudl9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vdmltZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zb3VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REEsYUFBYSxtQkFB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QUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDNVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7Ozs7OztBQ3hGQTtBQUNBOztBQUVBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNoQkE7QUFDQSxhQUFhLG1CQUFPLENBQUMsQ0FBdUIsRUFBRTtBQUM5QyxZQUFZLG1CQUFPLENBQUMsRUFBWSxFQUFFO0FBQ2xDLFlBQVksbUJBQU8sQ0FBQyxDQUFZLEVBQUU7QUFDbEMsaURBQWlEOztBQUVqRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUI7O0FBRXZCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSyxLQUFLO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBLCtCQUErQjtBQUMvQiwyQkFBMkI7O0FBRTNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpREFBaUQ7QUFDakQsd0RBQXdEO0FBQ3hELG1GQUFtRjtBQUNuRjtBQUNBLDhCQUE4QjtBQUM5QixtQ0FBbUM7QUFDbkM7O0FBRUEsOEVBQThFO0FBQzlFLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0EsS0FBSyxPQUFPO0FBQ1o7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QixtQkFBbUI7QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsc0JBQXNCO0FBQ3RCLDBCQUEwQjtBQUMxQixlQUFlO0FBQ2Y7QUFDQSxzQkFBc0I7QUFDdEIsbUNBQW1DO0FBQ25DLDJCQUEyQjtBQUMzQixnQ0FBZ0M7QUFDaEMsMkRBQTJEO0FBQzNELFNBQVMsT0FBTztBQUNoQjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLEtBQUssaUJBQWlCO0FBQ3RCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsc0JBQXNCO0FBQ3RCLDBCQUEwQjtBQUMxQixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLHlDQUF5QztBQUN6QywyQkFBMkI7QUFDM0IsNEJBQTRCO0FBQzVCLDJEQUEyRDtBQUMzRCxTQUFTLE9BQU87QUFDaEIsZ0RBQWdEO0FBQ2hELDRDQUE0QztBQUM1QztBQUNBLEtBQUssaUJBQWlCO0FBQ3RCLEM7Ozs7OztBQ2pJQTtBQUNBLGFBQWEsbUJBQU8sQ0FBQyxDQUFvQjs7QUFFekM7QUFDQSx3Q0FBd0M7QUFDeEMsMERBQTBEOztBQUUxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUIscUJBQXFCO0FBQ3JCLEtBQUssT0FBTztBQUNaO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQSxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGIzNWQ0OWU0NGZkOTk5MzBmYzk2IiwibGV0IGNvbmZpZyA9IHJlcXVpcmUoJy4vZW52X2NvbmZpZy5qcycpO1xubGV0IGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnKTtcblxuZ2xvYmFsLnJlc2V0ID0gZnVuY3Rpb24oKSB7IC8vIHNldHMgdGhlIHByb3BlcnR5IHRvIGl0J3MgZW52Q29uZmlnIHZhbHVlXG4gICAgZm9yKGFyZyBpbiBhcmd1bWVudHMpeyAvLyBsb29wIHRocm91Z2ggdGhlIGFyZ3VtZW50cyBcbiAgICAgICAgbGV0IGVhY2ggPSBhcmd1bWVudHNbYXJnXTtcbiAgICAgICAgZ2xvYmFsW2VhY2hdID0gY29uZmlnW2VhY2hdO1xuICAgIH1cbn1cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvZ2xvYmFsX3ZhcmlhYmxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJsZXQgbW91c2UgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xubGV0IGdsb2JhbCA9IHJlcXVpcmUoJy4vZ2xvYmFsX3ZhcmlhYmxlcy5qcycpO1xuXG5tb3VzZS5nZXRNb3VzZVNwZWVkID0gZnVuY3Rpb24oZGF0ZSkge1xuXG4gICAgLyogZ2V0cyBsYXN0TW91c2VBcnJheSwgd2ljaCBoYXMgdGhlIGxhc3QgbW91c2UgcG9zaXRpb25zIGFuZCBkYXRlcyxcbiAgICBsb29wcyB0aHJvdWdoIGl0IGFuZCBwdXNocywgaW50byByZXMsIHRoZSBlbGVtZW50cyBhZGRlZCB0byB0aGUgYXJyYXlcbiAgICAyMDBtcyBiZWZvcmUgYmFsbCBkcm9wLiBUaGVuIGNoZWNrcyB0aGUgZmlyc3QgYW5kIGxhc3QgZWxlbWVudHMgb2ZcbiAgICByZXMgdG8gc2VlIGhvdyBtYW55IHBpeGVscyB0aGUgbW91c2UgXCJyYW5cIiBpbiAyMDBtcyBhbmQgdGhlbiBnZXRzIGl0J3NcbiAgICBzcGVlZCBpbiBtb3VzZVNwZWVkIGluIHB4L3MgKi9cblxuICAgIGxldCBsID0gZ2xvYmFsLmxhc3RNb3VzZUFycmF5O1xuICAgIGxldCByZXMgPSBbXTtcblxuICAgIGwuZm9yRWFjaCgoZWFjaCkgPT4ge1xuICAgICAgICBpZiAoZGF0ZSAtIGVhY2guZGF0ZSA8IDIwMCkgcmVzLnB1c2goZWFjaCk7XG4gICAgfSk7XG5cbiAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgICB4OiByZXNbcmVzLmxlbmd0aCAtIDFdLnggLSByZXNbMF0ueCxcbiAgICAgICAgeTogcmVzW3Jlcy5sZW5ndGggLSAxXS55IC0gcmVzWzBdLnlcbiAgICB9XG5cbiAgICBpZihyZXN1bHQueCA8IDApIHJlc3VsdC54ICo9IC0xO1xuICAgIGlmKHJlc3VsdC55IDwgMCkgcmVzdWx0LnkgKj0gLTE7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb3VzZS5nZXRNb3VzZURpcmVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgLyogZ2V0cyB0aGUgbGFzdCAyIG1vdXNlIHBvc2l0aW9ucyBvbiBsYXN0TW91c2VBcnJheSwgaWYgZWxlbWVudCAxIFxuICAgIGlzIGxlc3MgdGhhbiAyLCB0aGUgbW91c2UgaXMgZ29pbmcgcmlnaHQsIGVsc2UgbGVmdC4uLiAqL1xuXG4gICAgbGV0IGwgPSBnbG9iYWwubGFzdE1vdXNlQXJyYXk7XG4gICAgbGV0IHJlcyA9IHt9O1xuICAgIGlmIChsW2wubGVuZ3RoIC0gMl0ueCA8PSBsW2wubGVuZ3RoIC0gMV0ueCkgcmVzLnggPSAxOyAvL3JpZ2h0XG4gICAgZWxzZSByZXMueCA9IDA7IC8vbGVmdFxuICAgIGlmIChsW2wubGVuZ3RoIC0gMl0ueSA+PSBsW2wubGVuZ3RoIC0gMV0ueSkgcmVzLnkgPSAxOyAvL3VwXG4gICAgZWxzZSByZXMueSA9IDA7IC8vZG93blxuICAgIHJldHVybiByZXM7XG59XG5cbm1vdXNlLnNldE1vdXNlQ29vcmRzID0gZnVuY3Rpb24oZSkge1xuICAgIC8qIGZpcmVzIGV2ZXJ5IHRpbWUgdGhlIG1vdXNlIG1vdmVzIG9uIHRoZSB3aW5kb3csIHNldHMgbW91c2VQb3Mgd2l0aCBcbiAgICB0aGUgbW91c2UgY29vcmRzIGFuZCBwb3B1bGF0ZXMgbGFzdE1vdXNlQXJyYXkgd2l0aCBtb3VzZSBwb3NpdGlvbiBhbmQgZGF0ZSxcbiAgICBsZWF2aW5nIHRoZSBhcnJheSB3aXRoIDEwMCBtYXggbGVuZ3RoKi9cblxuICAgIGxldCBsID0gZ2xvYmFsLmxhc3RNb3VzZUFycmF5O1xuICAgIG1vdXNlLm1vdXNlUG9zID0geyB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9O1xuICAgIGlmIChsLmxlbmd0aCA+PSAxMDApIGwuc2hpZnQoKTtcbiAgICBsZXQgZCA9IG5ldyBEYXRlKCk7XG4gICAgbC5wdXNoKHtcbiAgICAgICAgeDogZS5jbGllbnRYLFxuICAgICAgICB5OiBlLmNsaWVudFksXG4gICAgICAgIGRhdGU6IGRcbiAgICB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9tb3VzZS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCchc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXIhLi4vc3R5bGUuY3NzJyk7IC8vIGxvYWQgc3R5bGUuY3NzIGZpbGUgdG8gYmUgcGFyc2VkIGluc2lkZSB0aGUgYnVuZGxlcy5qc1xuXG5sZXQgc2NlbmFyaW8gPSByZXF1aXJlKCcuL3NjZW5hcmlvJyk7IC8vIHNjZW5hcmlvIG1vZHVsZVxubGV0IG1vdXNlID0gcmVxdWlyZSgnLi9tb3VzZS5qcycpOyAvLyBtb3VzZSBldmVudHMgbW9kdWxlXG5sZXQgbW92aW1lbnQgPSByZXF1aXJlKCcuL21vdmltZW50LmpzJyk7IC8vIG1vdmltZW50IG1vZHVsZVxuXG5mdW5jdGlvbiBpbml0KHNjZW5lID0gZmFsc2UpIHsgLy8gYWRkcyBldmVudGxpc3RlbmVycyB0byBET00gZWxlbWVudHNcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdmltZW50LmRyb3BCYWxsKTsgLy8gZHJvcCB0aGUgYmFsbFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZS5zZXRNb3VzZUNvb3Jkcyk7IC8vIGRyYWcgdGhlIGJhbGwgYW5kIGZvbGxvdyB0aGUgbW91c2UgcG9zaXRpb25cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFsbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG1vdmltZW50LmdyYWJCYWxsKTsgLy8gZ3JhYiBiYWxsXG4gICAgaWYgKHNjZW5lKSBzY2VuYXJpby5iYWNrU2NlbmUoKTsgLy8gcHV0cyBhbiBiYWNrZ3JvdW5kIGltYWdlIG9uIHRoZSBwYWdlXG59XG5cbmluaXQoKTtcblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9zcmMvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBwYWRkaW5nOiAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHNreWJsdWU7XFxuICAgIG92ZXJmbG93OmhpZGRlbjtcXG59XFxuXFxuI2dyb3VuZCB7XFxuICAgIGhlaWdodDogMjAlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA4MCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig5MiwgODUsIDg1KTtcXG59XFxuXFxuI2JhbGwge1xcbiAgICBoZWlnaHQ6IDEwdmg7XFxuICAgIHdpZHRoOiAxMHZoOyAgICBcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAxMCU7IC8qIDgyLjElOyAqLyBcXG4gICAgbGVmdDogMzBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbn1cXG5cXG4jYmFsbCBpbWcge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4jYmFsbDpob3ZlciB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL3NyYy9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZm4uY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bc2VsZWN0b3JdXG5cdH07XG59KShmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbn0pO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50byArIFwiIFwiICsgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibGV0IHNjZW5hcmlvID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbmxldCBiYWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhbGwnKS5zdHlsZTtcblxuc2NlbmFyaW8uYmFja1NjZW5lID0gZnVuY3Rpb24oKSB7IC8vIGFkZHMgYW4gaW1hZ2UgYXMgYmFja2dyb3VuZFxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJ2h0dHBzOi8vaW1hZ2VzLmZyZWVpbWFnZXMuY29tL2ltYWdlcy9sYXJnZS1wcmV2aWV3cy8xMzIveWVsbG93LXJvYWQtMTM1NDgwNS5qcGcnKVwiO1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWSA9IFwiLTI5MHB4XCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyb3VuZCcpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9zY2VuYXJpby5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnOiAgMC41LFxuICAgIGdyYXZpdHk6IDAuMDEsXG4gICAgaFNwZWVkOiAgMC4yMSxcbiAgICB2U3BlZWQ6ICA1LFxuICAgIGhBY2NlbGVyYXRpb246ICAtMC4wMDAxLFxuICAgIGdyb3VuZDogIDgzLjIsXG4gICAgdm9sdW1lOiAgMSxcbiAgICBsb29wczogIDAsXG4gICAgbW91c2VQb3M6ICB7IHg6IDAsIHk6IDB9LFxuICAgIG1vdXNlb246ICAwLFxuICAgIHJpZ2h0V2FsbDogIDk2LFxuICAgIGxlZnRXYWxsOiAgLTEsXG4gICAgbG93TGltaXQ6ICAwLjAwMSxcbiAgICBmcmljdGlvbkZsYWc6ICAwLFxuICAgIGxhc3RNb3VzZUFycmF5OiBbXVxufVxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9lbnZfY29uZmlnLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImxldCBtb3ZpbWVudCA9IG1vZHVsZS5leHBvcnRzID0ge307XG5sZXQgZ2xvYmFsID0gcmVxdWlyZSgnLi9nbG9iYWxfdmFyaWFibGVzLmpzJyk7IC8vIGdldCBnbG9iYWwgdmFyaWFibGVzXG5sZXQgc291bmQgPSByZXF1aXJlKCcuL3NvdW5kLmpzJyk7IC8vIHNvdW5kIG1vZHVsZVxubGV0IG1vdXNlID0gcmVxdWlyZSgnLi9tb3VzZS5qcycpOyAvLyBtb3VzZSBldmVudHMgbW9kdWxlXG5sZXQgYmFsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWxsJykuc3R5bGU7IC8vIGdldCBodG1sIGJhbGwgZGl2XG5cbm1vdmltZW50LmdyYWJCYWxsID0gZnVuY3Rpb24gKCkge1xuXG4gICAgZ2xvYmFsLmhTcGVlZCA9IGdsb2JhbC52b2x1bWUgPSAwO1xuICAgIGdsb2JhbC5yZXNldCgnZycsICdoQWNjZWxlcmF0aW9uJywgJ2xvb3BzJyk7XG5cbiAgICBsZXQgYm9keVdpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcbiAgICBsZXQgYm9keUhlaWdodCA9IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0O1xuICAgIGdsb2JhbC5tb3VzZW9uID0gMTsgLy8gaW5kaWNhdGVzIHRoYXQgdGhlIG1vdXNlZG93biB3YXMgZmlyZWRcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyByZWN1cnNpdmUgZnVuY3Rpb24gdGhhdCBtYWtlcyB0aGUgYmFsbCBmb2xsb3cgdGhlIG1vdXNlIGFzIGlmIHRoZSB1c2VyIHdhcyBob2xkaW5nIGl0XG5cbiAgICAgICAgYmFsbC50b3AgPSAoKG1vdXNlLm1vdXNlUG9zLnkgKiAxMDApIC8gYm9keUhlaWdodCAtIDIuNSkgKyAnJSc7XG5cbiAgICAgICAgLyogMC4wMyBpcyBhIGxpbWl0IHNvIHRoZSBiYWxsIG9ubHkgZm9sbG93IHRoZSBtb3VzZSBvbiB0aGUgZGVsaW1pdHRlZCByZWN0YW5nbGVcbiAgICAgICAgdG8gYXZvaWQgYnVncywgMi41IGlzIHRoZSBiYWxsIHJhZGl1cywgc28gdGhlIG1vdXNlIFwiZ3JhYnNcIiB0aGUgbW91c2Ugb24gaXRzIGNlbnRlciAqL1xuXG4gICAgICAgIGJhbGwubGVmdCA9ICgobW91c2UubW91c2VQb3MueCAqIDEwMCkgLyBib2R5V2lkdGggLSAyLjUpICsgJyUnO1xuXG4gICAgICAgIC8vIHNldHMgdGhlIHZvbHVtZSBvZiB0aGUgYmFsbCBzb3VuZCBiYXNlZCBvbiB0aGUgXCJkcm9wXCIgeSBwb3NpdGlvblxuXG4gICAgICAgIGdsb2JhbC52b2x1bWUgPSAoKChtb3VzZS5tb3VzZVBvcy55ICogMTAwKSAvIGJvZHlIZWlnaHQgLSAyLjUpIC8gMTAwKSA+PSAwXG4gICAgICAgICAgICA/IDEgLSAoKChtb3VzZS5tb3VzZVBvcy55ICogMTAwKSAvIGJvZHlIZWlnaHQgLSAyLjUpIC8gMTAwKSA6IDE7XG5cbiAgICAgICAgLyogbW91c2VvbiBzdGFydHMgYXMgMCwgYmVjb21lcyAxIHdoZW4gdGhlIGJhbGwgaXMgY2xpY2tlZCBhbmRcbiAgICAgICAgc3RheXMgMSB1bnRpbCBtb3VzZXVwIGlzIGZpcmVkIG9uIHRoZSB3aW5kb3cgKi9cblxuICAgICAgICBpZiAoZ2xvYmFsLm1vdXNlb24gPT09IDEpIG1vdmltZW50LmdyYWJCYWxsKCk7XG5cbiAgICB9LCA1KTsgLy8gdGhlIHJlY3Vyc2l2ZSBmdW5jdGlvbiBuZWVkcyB0byBoYXZlIGEgdGltZW91dCBvZiBhdCBsZWFzdCAxXG4gICAgLy8gc28gdGhlIGFwcCBkb2Vzbid0IGNyYXNoLi4uIFxufVxuXG5tb3ZpbWVudC5kcm9wQmFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZ2xvYmFsLm1vdXNlb24gPT09IDEpIHsgLy8gaWYgdGggbW91c2UgaXMgd2FzIGJlZW4gcHJlc3NlZFxuICAgICAgICBnbG9iYWwubW91c2VvbiA9IDA7IC8vIGluZGljYXRlcyB0aGF0IHRoZSB1c2VyIHJlbGVhc2VkIHRoZSBtb3VzZVxuXG4gICAgICAgIC8vIGdldHMgdGhlIG1vdXNlIHNwZWVkIGFuZCBhcHBseSBpdCB0byB0aGUgYmFsbCBob3Jpem9udGFsIHNwZWVkXG4gICAgICAgIGdsb2JhbC5oU3BlZWQgPSBtb3VzZS5nZXRNb3VzZVNwZWVkKG5ldyBEYXRlKCkpLnggLyAxMDAwO1xuICAgICAgICBnbG9iYWwuZyA9IG1vdXNlLmdldE1vdXNlU3BlZWQobmV3IERhdGUoKSkueSAvIDUwMDtcblxuICAgICAgICAvKiBpZiBtb3VzZSBpcyBnb2luZyBsZWZ0IGNoYW5nZSBob3Jpem9udGFsIFxuICAgICAgICBzcGVlZCBhbmQgYWNjZWxhcmF0aW9uIHRvIG5lZ2F0aXZlICovXG4gICAgICAgIGlmIChtb3VzZS5nZXRNb3VzZURpcmVjdGlvbigpLnggPT0gMCkge1xuICAgICAgICAgICAgZ2xvYmFsLmhTcGVlZCAqPSAtMTtcbiAgICAgICAgICAgIGdsb2JhbC5oQWNjZWxlcmF0aW9uICo9IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2FsbCBmYWxsIGZ1bmN0aW9uIHBhc3NpbmcgdGhlIGN1cnJlbnQgYmFsbCBwb3NpdGlvbiBpbiAnJSdcbiAgICAgICAgLy8gdXNpbmcgdGhlIHNsaWNlIG1ldGhvZCB0byBqdXN0IHRoZSBwb3NpdGlvbiBudW1iZXIgKDEzJSA9PiAxMykgXG4gICAgICAgIGlmIChtb3VzZS5nZXRNb3VzZURpcmVjdGlvbigpLnkgPT0gMSkge1xuICAgICAgICAgICAgbW92aW1lbnQuanVtcCgrYmFsbC5sZWZ0LnNsaWNlKDAsIGJhbGwubGVmdC5sZW5ndGggLSAxKSwgK2JhbGwudG9wLnNsaWNlKDAsIGJhbGwudG9wLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vdmltZW50LmZhbGwoK2JhbGwubGVmdC5zbGljZSgwLCBiYWxsLmxlZnQubGVuZ3RoIC0gMSksICtiYWxsLnRvcC5zbGljZSgwLCBiYWxsLnRvcC5sZW5ndGggLSAxKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vdmltZW50LmtpbmVtYXRpYyA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgYmFsbC50cmFuc2Zvcm0gPSAncm90YXRlKCcgKyB4ICogMTIgKyAnZGVnKSc7IC8vIHJvdGF0ZXMgdGhlIGJhbGwgb24gaXRzIG93biBheGlzXG4gICAgaWYgKHggPj0gZ2xvYmFsLnJpZ2h0V2FsbCB8fCB4IDw9IGdsb2JhbC5sZWZ0V2FsbCkgeyAvLyB3aGVuIGJhbGwgaGl0cyB0aGUgd2FsbFxuICAgICAgICB4ID0geCA+PSBnbG9iYWwucmlnaHRXYWxsID8gZ2xvYmFsLnJpZ2h0V2FsbCAtIDAuMSA6IGdsb2JhbC5sZWZ0V2FsbCArIDAuMTsgLy8gc2V0IHggdG8gMC4xJSBhd2F5IGZyb20gdGhlIHdhbGwgdG8gYXZvaWQgYnVnc1xuICAgICAgICBzb3VuZC5wbGF5U291bmQoMSk7XG4gICAgICAgIGdsb2JhbC5oU3BlZWQgKj0gLTAuOTsgICAgICAvLyBjaGFuZ2UgYmFsbCBkaXJlY3Rpb25cbiAgICAgICAgZ2xvYmFsLmhBY2NlbGVyYXRpb24gKj0gLTE7IC8vIGFuZCByZWR1Y2VzIGl0J3Mgc3BlZWQgYSBiaXRcbiAgICB9XG5cbiAgICBpZiAoZ2xvYmFsLmhTcGVlZCA8IGdsb2JhbC5sb3dMaW1pdCAmJiBnbG9iYWwuaFNwZWVkID4gLWdsb2JhbC5sb3dMaW1pdCkgeyAvLyBpZiBiYWxsIGdldHMgdmVyeSBzbG93XG4gICAgICAgIGdsb2JhbC5oU3BlZWQgPSAwOyAvLyBzdG9wIGJhbGwgaG9yaXpvbnRhbGx5XG4gICAgICAgIGlmIChnbG9iYWwudm9sdW1lIDwgMC4xNjkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gaWYgYmFsbCBpcyB0b28gbG93IHJldHVybnMgMSBzbyBmYWxsL2p1bXAgd2lsbCBzdG9wIHRoZSBiYWxsIHZlcnRpY2FsbHlcbiAgICB9IGVsc2UgeyAvLyBpZiB0aGUgYmFsbCBpcyBub3QgdG9vIHNsb3cgcmVkdWNlIGl0J3Mgc3BlZWRcbiAgICAgICAgZ2xvYmFsLmhTcGVlZCArPSBnbG9iYWwuaEFjY2VsZXJhdGlvbjtcbiAgICB9XG4gICAgYmFsbC5sZWZ0ID0geCArICclJzsgLy8gbW92ZSB0aGUgYmFsbCB0byB4XG4gICAgZ2xvYmFsLmxvb3BzKys7IC8vIFwibG9vcHNcIiBpbmNyZWFzZXMgb24gZmFsbCBhbmQganVtcCwgaXQncyB1c2VkIHRvIHNldCBzb3VuZCB2b2x1bWVcbiAgICByZXR1cm4geDtcbn1cblxubW92aW1lbnQuZmFsbCA9IGZ1bmN0aW9uICh4ID0gMCwgeSA9IDApIHtcbiAgICAvKiBpZiBubyBhcmd1bWVudCBpcyBwYXNzZWQsIHRoZSBiYWxsIHN0YXJ0c1xuICAgIGF0IHRoZSB0b3AgbGVmdCBvZiB0aGUgd2luZG93ICovXG4gICAgeCA9IG1vdmltZW50LmtpbmVtYXRpYyh4LCB5KTsgLy8gc2V0cyBmYWxsJ3MgeCB0byBraW5lbWF0aWMncyB4XG4gICAgaWYgKHggPT09IGZhbHNlKSB7IC8vIGlmIGtpbmVtYXRpYyByZXR1cm5zIGZhbHNlIFxuICAgICAgICB5ID0gZ2xvYmFsLmdyb3VuZDsgLy8gc3RvcCB0aGUgYmFsbCB2ZXJ0aWNhbGx5XG4gICAgICAgIHJldHVybjsgLy8gYnJlYWsgZnVuY3Rpb25zIGZhbGwgYW5kIGp1bXBcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIG5lZWRzIHRpbWVvdXQgc28gdGhlIHJlY3Vyc2l2ZSBmdW5jdGlvbnMgZG9uJ3QgY3Jhc2ggdGhlIGFwcFxuICAgICAgICBnbG9iYWwuZyArPSBnbG9iYWwuZ3Jhdml0eTsgLy8gXCJncmF2aXR5XCIgKHNwZWVkIHdpbGwgYmUgaW5jcmVhc2luZyB1bnRpbCBpdCByZWFjaGVzIHRoZSBncm91bmQpXG4gICAgICAgIGJhbGwudG9wID0geSArICclJzsgLy8gcG9zaXRpb24gdGhlIGJhbGxcbiAgICAgICAgaWYgKHkgPCBnbG9iYWwuZ3JvdW5kKSB7IC8vIGlmIHRoZSBiYWxsIGhhc24ndCBoaXQgdGhlIGdyb3VuZFxuICAgICAgICAgICAgbW92aW1lbnQuZmFsbCh4ICsgZ2xvYmFsLmhTcGVlZCwgeSArIGdsb2JhbC5nKTsgLy8gY29udGludWUgZmFsbGluZyBhbmQgZ29pbmcgaG9yaXpvbnRhbGx5XG4gICAgICAgIH0gZWxzZSB7IC8vIHdoZW4gYmFsbCBoaXRzIHRoZSBncm91bmRcbiAgICAgICAgICAgIHNvdW5kLnBsYXlTb3VuZCgpO1xuICAgICAgICAgICAgbW92aW1lbnQuanVtcCh4ICsgZ2xvYmFsLmhTcGVlZCk7IC8vIGNhbGwganVtcCBwYXNzaW5nIGJhbGwncyBjdXJyZW50IHggcG9zaXRpb25cbiAgICAgICAgfVxuICAgIH0sIGdsb2JhbC52U3BlZWQpOyAvLyBzcGVlZCBvZiB0aGUgcHJvZ3JhbSAodGhlIG1vcmUgdGhlIHNsb3dlcilcbn1cblxuXG5tb3ZpbWVudC5qdW1wID0gZnVuY3Rpb24gKHgsIHkgPSBnbG9iYWwuZ3JvdW5kKSB7XG4gICAgLyogaWYgdGhlcmUgaXMgbm8geSBhcmd1bWVudCB0aGUgZnVuY3Rpb24gd2FzIGNhbGxlZCBmcm9tIGZhbGxcbiAgICB3aWNoIG1lYW5zIHRoZSBiYWxsIGlzIG9uIHRoZSBncm91bmQqL1xuICAgIHggPSBtb3ZpbWVudC5raW5lbWF0aWMoeCwgeSk7IC8vIHNldHMgZmFsbCdzIHggdG8ga2luZW1hdGljJ3MgeFxuICAgIGlmICh4ID09PSBmYWxzZSkgeyAvLyBpZiBraW5lbWF0aWMgcmV0dXJucyBmYWxzZSBcbiAgICAgICAgeSA9IGdsb2JhbC5ncm91bmQ7IC8vIHN0b3AgdGhlIGJhbGwgdmVydGljYWxseVxuICAgICAgICByZXR1cm47IC8vIGJyZWFrIGZ1bmN0aW9ucyBmYWxsIGFuZCBqdW1wXG4gICAgfVxuICAgIGlmKHkgPD0gMCkge1xuICAgICAgICBzb3VuZC5wbGF5U291bmQoMSk7XG4gICAgICAgIG1vdmltZW50LmZhbGwoeCwgeSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIG5lZWRzIHRpbWVvdXQgc28gdGhlIHJlY3Vyc2l2ZSBmdW5jdGlvbnMgZG9uJ3QgY3Jhc2ggdGhlIGFwcFxuICAgICAgICBnbG9iYWwuZyAtPSBnbG9iYWwuZ3Jhdml0eSAqIDEuNDsgLy8gXCJncmF2aXR5XCIgKHNwZWVkIHdpbGwgYmUgZGVjcmVhc2luZyB1bnRpbCBpdCBnZXRzIHRvIHplcm8pXG4gICAgICAgIGJhbGwudG9wID0geSArICclJzsgLy8gcG9zaXRpb24gdGhlIGJhbGxcbiAgICAgICAgaWYgKGdsb2JhbC5nID49IDApIHsgLy8gaWYgdGhlIGJhbGwgaGFzIHZlcnRpY2FsIHNwZWVkXG4gICAgICAgICAgICBtb3ZpbWVudC5qdW1wKHggKyBnbG9iYWwuaFNwZWVkLCB5IC0gZ2xvYmFsLmcpOyAvLyBjb250aW51ZSBnb2luZyB1cCBhbmQgaG9yaXpvbnRhbGx5XG4gICAgICAgIH0gZWxzZSB7IC8vIGlmIHNwZWVkIHJlYWNocyAwXG4gICAgICAgICAgICBtb3ZpbWVudC5mYWxsKHggKyBnbG9iYWwuaFNwZWVkLCB5KTsgLy8gc3RhcnQgZmFsbGluZyBmcm9tIGJhbGwncyBjdXJyZW50IHggYW5kIHkgcG9zaXRpb25cbiAgICAgICAgICAgIGdsb2JhbC52b2x1bWUgPSAoMTAwIC0geSkgLyAxMDA7IC8vIHNldHMgc291bmQgdm9sdW1lIHJlbGF0aXZlIHRvIHRoZSBmYWxsIGhlaWdodFxuICAgICAgICB9XG4gICAgfSwgZ2xvYmFsLnZTcGVlZCk7IC8vIHNwZWVkIG9mIHRoZSBwcm9ncmFtICh0aGUgbW9yZSB0aGUgc2xvd2VyKVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL21vdmltZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJsZXQgc291bmQgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xubGV0IGdsb2JhbCA9IHJlcXVpcmUoJy4vZ2xvYmFsX3ZhcmlhYmxlcycpO1xuXG5zb3VuZC5wbGF5U291bmQgPSBmdW5jdGlvbih3YWxsKSB7XG4gICAgaWYgKGdsb2JhbC52b2x1bWUgPiAwLjE2OSB8fCB3YWxsKSB7IC8vIGlmIHNvdW5kJ3Mgdm9sdW1lIGlzIHRvbyBzbWFsbCBkb24ndCBwbGF5IGl0IGF0IGFsbFxuICAgICAgICBsZXQgc291bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXVkaW8tYmFsbCcpOyAvLyBnZXRzIGh0bWwgYXVkaW8gdGFnXG5cbiAgICAgICAgLyogc2V0cyB0aGUgdm9sdW1lIGJhc2VkIG9uIHRoZSBoZWlnaHQgb2YgdGhlIGZhbGwgXG4gICAgICAgIGFuZCBob3cgbWFueSBsb29wcyB0aGUgcHJvZ3JhbSBkaWQgKi9cbiAgICAgICAgbGV0IHNWb2x1bWUgPSBnbG9iYWwudm9sdW1lIC0gZ2xvYmFsLmxvb3BzIC8gMjUwMDA7XG4gICAgICAgIGlmKHNWb2x1bWUgPD0gMSAmJiBzVm9sdW1lID49IDApIHtcbiAgICAgICAgICAgIHNvdW5kLnZvbHVtZSA9IHNWb2x1bWU7XG4gICAgICAgIH1cbiAgICAgICAgc291bmQuY3VycmVudFRpbWUgPSAwOyAvLyBzdG9wIGN1cnJlbnQgc291bmQgYmVmb3JlIHBsYXlpbmcgYW5vdGhlciBvbmVcbiAgICAgICAgc291bmQucGxheSgpOyAvLyBwbGF5IHRoZSBzb3VuZCB3aGVuIHRoZSBiYWxsIGhpdHMgdGhlIGdyb3VuZCBvciB3YWxsXG4gICAgfSBlbHNlIHsgLy8gaWYgdGhlIGJhbGwgaXMgcm9sbGluZyBvbiB0aGUgZ3JvdW5kIChub3QganVtcGluZyBhbnkgbW9yZSlcbiAgICAgICAgaWYgKGdsb2JhbC5mcmljdGlvbkZsYWcgPT09IDApIGdsb2JhbC5oQWNjZWxlcmF0aW9uICo9IDIuNTtcbiAgICAgICAgLy8gaW5jcmVhc2UgZnJpY3Rpb24gYmVjYXVzZSBiYWxsIGlzIGluIGNvbnRhbnQgY29udGFjdCB3aXRoIHRoZSBncm91bmRcbiAgICAgICAgZ2xvYmFsLmZyaWN0aW9uRmxhZyA9IDE7IC8vIGRvIHRoaXMganVzdCBvbmUgdGltZVxuICAgIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9zb3VuZC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==
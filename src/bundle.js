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
    window.addEventListener('resize', scenario.setBallSize); // sets the ball size dynamicly
    window.addEventListener('mouseup', moviment.dropBall); // drop the ball
    window.addEventListener('mousemove', mouse.setMouseCoords); // drag the ball and follow the mouse position
    document.getElementById('ball').addEventListener('mousedown', moviment.grabBall); // grab ball
    if (scene) scenario.backScene(); // puts an background image on the page
    scenario.setBallSize(); // resize ball on init
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
exports.push([module.i, "body {\n    margin: 0px;\n    padding: 0px;\n    background-color: skyblue;\n    overflow:hidden;\n}\n\n#ground {\n    height: 20%;\n    width: 100%;\n    display: block;\n    position: absolute;\n    top: 80%;\n    background-color: rgb(92, 85, 85);\n}\n\n#ball {\n    height: 10px;\n    width: 10px;    \n    display: block;\n    position: absolute;\n    top: 10%; /* 82.1%; */ \n    left: 30px;\n    border-radius: 50%;\n}\n\n#ball img {\n    height: 100%;\n    width: 100%;\n}\n\n#ball:hover {\n    cursor: pointer;\n}", ""]);

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
}

scenario.setBallSize = function() { // sets ball's width and height to 5% of the body width
    ball.width = '5%';
    ball.height = (5 * document.body.clientWidth) / 100;
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjhjYzBmM2M1NzNlZDYwYmQ2YjIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dsb2JhbF92YXJpYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vdXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5jc3M/YmQ4NCIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2NlbmFyaW8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Vudl9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vdmltZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zb3VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REE7QUFDQSw4Q0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDNVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7Ozs7OztBQ3hGQTtBQUNBOztBQUVBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBLEM7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2hCQTtBQUNBLG9DQUE4QztBQUM5QyxvQ0FBa0M7QUFDbEMsbUNBQWtDO0FBQ2xDLGlEQUFpRDs7QUFFakQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCOztBQUV2QjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEtBQUssS0FBSztBQUNWO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0I7QUFDL0IsMkJBQTJCOztBQUUzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaURBQWlEO0FBQ2pELHdEQUF3RDtBQUN4RCxtRkFBbUY7QUFDbkY7QUFDQSw4QkFBOEI7QUFDOUIsbUNBQW1DO0FBQ25DOztBQUVBLDhFQUE4RTtBQUM5RSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBLEtBQUssT0FBTztBQUNaO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEIsbUJBQW1CO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLHNCQUFzQjtBQUN0QiwwQkFBMEI7QUFDMUIsZUFBZTtBQUNmO0FBQ0Esc0JBQXNCO0FBQ3RCLG1DQUFtQztBQUNuQywyQkFBMkI7QUFDM0IsZ0NBQWdDO0FBQ2hDLDJEQUEyRDtBQUMzRCxTQUFTLE9BQU87QUFDaEI7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSxLQUFLLGlCQUFpQjtBQUN0Qjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLHNCQUFzQjtBQUN0QiwwQkFBMEI7QUFDMUIsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0Qix5Q0FBeUM7QUFDekMsMkJBQTJCO0FBQzNCLDRCQUE0QjtBQUM1QiwyREFBMkQ7QUFDM0QsU0FBUyxPQUFPO0FBQ2hCLGdEQUFnRDtBQUNoRCw0Q0FBNEM7QUFDNUM7QUFDQSxLQUFLLGlCQUFpQjtBQUN0QixDOzs7Ozs7QUNqSUE7QUFDQTs7QUFFQTtBQUNBLHdDQUF3QztBQUN4QywwREFBMEQ7O0FBRTFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QixxQkFBcUI7QUFDckIsS0FBSyxPQUFPO0FBQ1o7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZjhjYzBmM2M1NzNlZDYwYmQ2YjIiLCJsZXQgY29uZmlnID0gcmVxdWlyZSgnLi9lbnZfY29uZmlnLmpzJyk7XG5sZXQgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcpO1xuXG5nbG9iYWwucmVzZXQgPSBmdW5jdGlvbigpIHsgLy8gc2V0cyB0aGUgcHJvcGVydHkgdG8gaXQncyBlbnZDb25maWcgdmFsdWVcbiAgICBmb3IoYXJnIGluIGFyZ3VtZW50cyl7IC8vIGxvb3AgdGhyb3VnaCB0aGUgYXJndW1lbnRzIFxuICAgICAgICBsZXQgZWFjaCA9IGFyZ3VtZW50c1thcmddO1xuICAgICAgICBnbG9iYWxbZWFjaF0gPSBjb25maWdbZWFjaF07XG4gICAgfVxufVxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9nbG9iYWxfdmFyaWFibGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImxldCBtb3VzZSA9IG1vZHVsZS5leHBvcnRzID0ge307XG5sZXQgZ2xvYmFsID0gcmVxdWlyZSgnLi9nbG9iYWxfdmFyaWFibGVzLmpzJyk7XG5cbm1vdXNlLmdldE1vdXNlU3BlZWQgPSBmdW5jdGlvbihkYXRlKSB7XG5cbiAgICAvKiBnZXRzIGxhc3RNb3VzZUFycmF5LCB3aWNoIGhhcyB0aGUgbGFzdCBtb3VzZSBwb3NpdGlvbnMgYW5kIGRhdGVzLFxuICAgIGxvb3BzIHRocm91Z2ggaXQgYW5kIHB1c2hzLCBpbnRvIHJlcywgdGhlIGVsZW1lbnRzIGFkZGVkIHRvIHRoZSBhcnJheVxuICAgIDIwMG1zIGJlZm9yZSBiYWxsIGRyb3AuIFRoZW4gY2hlY2tzIHRoZSBmaXJzdCBhbmQgbGFzdCBlbGVtZW50cyBvZlxuICAgIHJlcyB0byBzZWUgaG93IG1hbnkgcGl4ZWxzIHRoZSBtb3VzZSBcInJhblwiIGluIDIwMG1zIGFuZCB0aGVuIGdldHMgaXQnc1xuICAgIHNwZWVkIGluIG1vdXNlU3BlZWQgaW4gcHgvcyAqL1xuXG4gICAgbGV0IGwgPSBnbG9iYWwubGFzdE1vdXNlQXJyYXk7XG4gICAgbGV0IHJlcyA9IFtdO1xuXG4gICAgbC5mb3JFYWNoKChlYWNoKSA9PiB7XG4gICAgICAgIGlmIChkYXRlIC0gZWFjaC5kYXRlIDwgMjAwKSByZXMucHVzaChlYWNoKTtcbiAgICB9KTtcblxuICAgIGxldCByZXN1bHQgPSB7XG4gICAgICAgIHg6IHJlc1tyZXMubGVuZ3RoIC0gMV0ueCAtIHJlc1swXS54LFxuICAgICAgICB5OiByZXNbcmVzLmxlbmd0aCAtIDFdLnkgLSByZXNbMF0ueVxuICAgIH1cblxuICAgIGlmKHJlc3VsdC54IDwgMCkgcmVzdWx0LnggKj0gLTE7XG4gICAgaWYocmVzdWx0LnkgPCAwKSByZXN1bHQueSAqPSAtMTtcblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbm1vdXNlLmdldE1vdXNlRGlyZWN0aW9uID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvKiBnZXRzIHRoZSBsYXN0IDIgbW91c2UgcG9zaXRpb25zIG9uIGxhc3RNb3VzZUFycmF5LCBpZiBlbGVtZW50IDEgXG4gICAgaXMgbGVzcyB0aGFuIDIsIHRoZSBtb3VzZSBpcyBnb2luZyByaWdodCwgZWxzZSBsZWZ0Li4uICovXG5cbiAgICBsZXQgbCA9IGdsb2JhbC5sYXN0TW91c2VBcnJheTtcbiAgICBsZXQgcmVzID0ge307XG4gICAgaWYgKGxbbC5sZW5ndGggLSAyXS54IDw9IGxbbC5sZW5ndGggLSAxXS54KSByZXMueCA9IDE7IC8vcmlnaHRcbiAgICBlbHNlIHJlcy54ID0gMDsgLy9sZWZ0XG4gICAgaWYgKGxbbC5sZW5ndGggLSAyXS55ID49IGxbbC5sZW5ndGggLSAxXS55KSByZXMueSA9IDE7IC8vdXBcbiAgICBlbHNlIHJlcy55ID0gMDsgLy9kb3duXG4gICAgcmV0dXJuIHJlcztcbn1cblxubW91c2Uuc2V0TW91c2VDb29yZHMgPSBmdW5jdGlvbihlKSB7XG4gICAgLyogZmlyZXMgZXZlcnkgdGltZSB0aGUgbW91c2UgbW92ZXMgb24gdGhlIHdpbmRvdywgc2V0cyBtb3VzZVBvcyB3aXRoIFxuICAgIHRoZSBtb3VzZSBjb29yZHMgYW5kIHBvcHVsYXRlcyBsYXN0TW91c2VBcnJheSB3aXRoIG1vdXNlIHBvc2l0aW9uIGFuZCBkYXRlLFxuICAgIGxlYXZpbmcgdGhlIGFycmF5IHdpdGggMTAwIG1heCBsZW5ndGgqL1xuXG4gICAgbGV0IGwgPSBnbG9iYWwubGFzdE1vdXNlQXJyYXk7XG4gICAgbW91c2UubW91c2VQb3MgPSB7IHg6IGUuY2xpZW50WCwgeTogZS5jbGllbnRZIH07XG4gICAgaWYgKGwubGVuZ3RoID49IDEwMCkgbC5zaGlmdCgpO1xuICAgIGxldCBkID0gbmV3IERhdGUoKTtcbiAgICBsLnB1c2goe1xuICAgICAgICB4OiBlLmNsaWVudFgsXG4gICAgICAgIHk6IGUuY2xpZW50WSxcbiAgICAgICAgZGF0ZTogZFxuICAgIH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL21vdXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJyFzdHlsZS1sb2FkZXIhY3NzLWxvYWRlciEuLi9zdHlsZS5jc3MnKTsgLy8gbG9hZCBzdHlsZS5jc3MgZmlsZSB0byBiZSBwYXJzZWQgaW5zaWRlIHRoZSBidW5kbGVzLmpzXG5cbmxldCBzY2VuYXJpbyA9IHJlcXVpcmUoJy4vc2NlbmFyaW8nKTsgLy8gc2NlbmFyaW8gbW9kdWxlXG5sZXQgbW91c2UgPSByZXF1aXJlKCcuL21vdXNlLmpzJyk7IC8vIG1vdXNlIGV2ZW50cyBtb2R1bGVcbmxldCBtb3ZpbWVudCA9IHJlcXVpcmUoJy4vbW92aW1lbnQuanMnKTsgLy8gbW92aW1lbnQgbW9kdWxlXG5cbmZ1bmN0aW9uIGluaXQoc2NlbmUgPSBmYWxzZSkgeyAvLyBhZGRzIGV2ZW50bGlzdGVuZXJzIHRvIERPTSBlbGVtZW50c1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzY2VuYXJpby5zZXRCYWxsU2l6ZSk7IC8vIHNldHMgdGhlIGJhbGwgc2l6ZSBkeW5hbWljbHlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdmltZW50LmRyb3BCYWxsKTsgLy8gZHJvcCB0aGUgYmFsbFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZS5zZXRNb3VzZUNvb3Jkcyk7IC8vIGRyYWcgdGhlIGJhbGwgYW5kIGZvbGxvdyB0aGUgbW91c2UgcG9zaXRpb25cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFsbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG1vdmltZW50LmdyYWJCYWxsKTsgLy8gZ3JhYiBiYWxsXG4gICAgaWYgKHNjZW5lKSBzY2VuYXJpby5iYWNrU2NlbmUoKTsgLy8gcHV0cyBhbiBiYWNrZ3JvdW5kIGltYWdlIG9uIHRoZSBwYWdlXG4gICAgc2NlbmFyaW8uc2V0QmFsbFNpemUoKTsgLy8gcmVzaXplIGJhbGwgb24gaW5pdFxufVxuXG5pbml0KCk7XG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vc3JjL3N0eWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgICBtYXJnaW46IDBweDtcXG4gICAgcGFkZGluZzogMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBza3libHVlO1xcbiAgICBvdmVyZmxvdzpoaWRkZW47XFxufVxcblxcbiNncm91bmQge1xcbiAgICBoZWlnaHQ6IDIwJTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogODAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoOTIsIDg1LCA4NSk7XFxufVxcblxcbiNiYWxsIHtcXG4gICAgaGVpZ2h0OiAxMHB4O1xcbiAgICB3aWR0aDogMTBweDsgICAgXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMTAlOyAvKiA4Mi4xJTsgKi8gXFxuICAgIGxlZnQ6IDMwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuXFxuI2JhbGwgaW1nIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICB3aWR0aDogMTAwJTtcXG59XFxuXFxuI2JhbGw6aG92ZXIge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9zcmMvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbihzZWxlY3Rvcikge1xuXHRcdGlmICh0eXBlb2YgbWVtb1tzZWxlY3Rvcl0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGZuLmNhbGwodGhpcywgc2VsZWN0b3IpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmIChzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bc2VsZWN0b3JdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3NlbGVjdG9yXVxuXHR9O1xufSkoZnVuY3Rpb24gKHRhcmdldCkge1xuXHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG59KTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcblx0aWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImxldCBzY2VuYXJpbyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5sZXQgYmFsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWxsJykuc3R5bGU7XG5cbnNjZW5hcmlvLmJhY2tTY2VuZSA9IGZ1bmN0aW9uKCkgeyAvLyBhZGRzIGFuIGltYWdlIGFzIGJhY2tncm91bmRcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCdodHRwczovL2ltYWdlcy5mcmVlaW1hZ2VzLmNvbS9pbWFnZXMvbGFyZ2UtcHJldmlld3MvMTMyL3llbGxvdy1yb2FkLTEzNTQ4MDUuanBnJylcIjtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvblkgPSBcIi0yOTBweFwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncm91bmQnKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbn1cblxuc2NlbmFyaW8uc2V0QmFsbFNpemUgPSBmdW5jdGlvbigpIHsgLy8gc2V0cyBiYWxsJ3Mgd2lkdGggYW5kIGhlaWdodCB0byA1JSBvZiB0aGUgYm9keSB3aWR0aFxuICAgIGJhbGwud2lkdGggPSAnNSUnO1xuICAgIGJhbGwuaGVpZ2h0ID0gKDUgKiBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoKSAvIDEwMDtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9zY2VuYXJpby5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnOiAgMC41LFxuICAgIGdyYXZpdHk6IDAuMDEsXG4gICAgaFNwZWVkOiAgMC4yMSxcbiAgICB2U3BlZWQ6ICA1LFxuICAgIGhBY2NlbGVyYXRpb246ICAtMC4wMDAxLFxuICAgIGdyb3VuZDogIDgzLjIsXG4gICAgdm9sdW1lOiAgMSxcbiAgICBsb29wczogIDAsXG4gICAgbW91c2VQb3M6ICB7IHg6IDAsIHk6IDB9LFxuICAgIG1vdXNlb246ICAwLFxuICAgIHJpZ2h0V2FsbDogIDk2LFxuICAgIGxlZnRXYWxsOiAgLTEsXG4gICAgbG93TGltaXQ6ICAwLjAwMSxcbiAgICBmcmljdGlvbkZsYWc6ICAwLFxuICAgIGxhc3RNb3VzZUFycmF5OiBbXVxufVxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9lbnZfY29uZmlnLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImxldCBtb3ZpbWVudCA9IG1vZHVsZS5leHBvcnRzID0ge307XG5sZXQgZ2xvYmFsID0gcmVxdWlyZSgnLi9nbG9iYWxfdmFyaWFibGVzLmpzJyk7IC8vIGdldCBnbG9iYWwgdmFyaWFibGVzXG5sZXQgc291bmQgPSByZXF1aXJlKCcuL3NvdW5kLmpzJyk7IC8vIHNvdW5kIG1vZHVsZVxubGV0IG1vdXNlID0gcmVxdWlyZSgnLi9tb3VzZS5qcycpOyAvLyBtb3VzZSBldmVudHMgbW9kdWxlXG5sZXQgYmFsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWxsJykuc3R5bGU7IC8vIGdldCBodG1sIGJhbGwgZGl2XG5cbm1vdmltZW50LmdyYWJCYWxsID0gZnVuY3Rpb24gKCkge1xuXG4gICAgZ2xvYmFsLmhTcGVlZCA9IGdsb2JhbC52b2x1bWUgPSAwO1xuICAgIGdsb2JhbC5yZXNldCgnZycsICdoQWNjZWxlcmF0aW9uJywgJ2xvb3BzJyk7XG5cbiAgICBsZXQgYm9keVdpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcbiAgICBsZXQgYm9keUhlaWdodCA9IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0O1xuICAgIGdsb2JhbC5tb3VzZW9uID0gMTsgLy8gaW5kaWNhdGVzIHRoYXQgdGhlIG1vdXNlZG93biB3YXMgZmlyZWRcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyByZWN1cnNpdmUgZnVuY3Rpb24gdGhhdCBtYWtlcyB0aGUgYmFsbCBmb2xsb3cgdGhlIG1vdXNlIGFzIGlmIHRoZSB1c2VyIHdhcyBob2xkaW5nIGl0XG5cbiAgICAgICAgYmFsbC50b3AgPSAoKG1vdXNlLm1vdXNlUG9zLnkgKiAxMDApIC8gYm9keUhlaWdodCAtIDIuNSkgKyAnJSc7XG5cbiAgICAgICAgLyogMC4wMyBpcyBhIGxpbWl0IHNvIHRoZSBiYWxsIG9ubHkgZm9sbG93IHRoZSBtb3VzZSBvbiB0aGUgZGVsaW1pdHRlZCByZWN0YW5nbGVcbiAgICAgICAgdG8gYXZvaWQgYnVncywgMi41IGlzIHRoZSBiYWxsIHJhZGl1cywgc28gdGhlIG1vdXNlIFwiZ3JhYnNcIiB0aGUgbW91c2Ugb24gaXRzIGNlbnRlciAqL1xuXG4gICAgICAgIGJhbGwubGVmdCA9ICgobW91c2UubW91c2VQb3MueCAqIDEwMCkgLyBib2R5V2lkdGggLSAyLjUpICsgJyUnO1xuXG4gICAgICAgIC8vIHNldHMgdGhlIHZvbHVtZSBvZiB0aGUgYmFsbCBzb3VuZCBiYXNlZCBvbiB0aGUgXCJkcm9wXCIgeSBwb3NpdGlvblxuXG4gICAgICAgIGdsb2JhbC52b2x1bWUgPSAoKChtb3VzZS5tb3VzZVBvcy55ICogMTAwKSAvIGJvZHlIZWlnaHQgLSAyLjUpIC8gMTAwKSA+PSAwXG4gICAgICAgICAgICA/IDEgLSAoKChtb3VzZS5tb3VzZVBvcy55ICogMTAwKSAvIGJvZHlIZWlnaHQgLSAyLjUpIC8gMTAwKSA6IDE7XG5cbiAgICAgICAgLyogbW91c2VvbiBzdGFydHMgYXMgMCwgYmVjb21lcyAxIHdoZW4gdGhlIGJhbGwgaXMgY2xpY2tlZCBhbmRcbiAgICAgICAgc3RheXMgMSB1bnRpbCBtb3VzZXVwIGlzIGZpcmVkIG9uIHRoZSB3aW5kb3cgKi9cblxuICAgICAgICBpZiAoZ2xvYmFsLm1vdXNlb24gPT09IDEpIG1vdmltZW50LmdyYWJCYWxsKCk7XG5cbiAgICB9LCA1KTsgLy8gdGhlIHJlY3Vyc2l2ZSBmdW5jdGlvbiBuZWVkcyB0byBoYXZlIGEgdGltZW91dCBvZiBhdCBsZWFzdCAxXG4gICAgLy8gc28gdGhlIGFwcCBkb2Vzbid0IGNyYXNoLi4uIFxufVxuXG5tb3ZpbWVudC5kcm9wQmFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZ2xvYmFsLm1vdXNlb24gPT09IDEpIHsgLy8gaWYgdGggbW91c2UgaXMgd2FzIGJlZW4gcHJlc3NlZFxuICAgICAgICBnbG9iYWwubW91c2VvbiA9IDA7IC8vIGluZGljYXRlcyB0aGF0IHRoZSB1c2VyIHJlbGVhc2VkIHRoZSBtb3VzZVxuXG4gICAgICAgIC8vIGdldHMgdGhlIG1vdXNlIHNwZWVkIGFuZCBhcHBseSBpdCB0byB0aGUgYmFsbCBob3Jpem9udGFsIHNwZWVkXG4gICAgICAgIGdsb2JhbC5oU3BlZWQgPSBtb3VzZS5nZXRNb3VzZVNwZWVkKG5ldyBEYXRlKCkpLnggLyAxMDAwO1xuICAgICAgICBnbG9iYWwuZyA9IG1vdXNlLmdldE1vdXNlU3BlZWQobmV3IERhdGUoKSkueSAvIDUwMDtcblxuICAgICAgICAvKiBpZiBtb3VzZSBpcyBnb2luZyBsZWZ0IGNoYW5nZSBob3Jpem9udGFsIFxuICAgICAgICBzcGVlZCBhbmQgYWNjZWxhcmF0aW9uIHRvIG5lZ2F0aXZlICovXG4gICAgICAgIGlmIChtb3VzZS5nZXRNb3VzZURpcmVjdGlvbigpLnggPT0gMCkge1xuICAgICAgICAgICAgZ2xvYmFsLmhTcGVlZCAqPSAtMTtcbiAgICAgICAgICAgIGdsb2JhbC5oQWNjZWxlcmF0aW9uICo9IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2FsbCBmYWxsIGZ1bmN0aW9uIHBhc3NpbmcgdGhlIGN1cnJlbnQgYmFsbCBwb3NpdGlvbiBpbiAnJSdcbiAgICAgICAgLy8gdXNpbmcgdGhlIHNsaWNlIG1ldGhvZCB0byBqdXN0IHRoZSBwb3NpdGlvbiBudW1iZXIgKDEzJSA9PiAxMykgXG4gICAgICAgIGlmIChtb3VzZS5nZXRNb3VzZURpcmVjdGlvbigpLnkgPT0gMSkge1xuICAgICAgICAgICAgbW92aW1lbnQuanVtcCgrYmFsbC5sZWZ0LnNsaWNlKDAsIGJhbGwubGVmdC5sZW5ndGggLSAxKSwgK2JhbGwudG9wLnNsaWNlKDAsIGJhbGwudG9wLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vdmltZW50LmZhbGwoK2JhbGwubGVmdC5zbGljZSgwLCBiYWxsLmxlZnQubGVuZ3RoIC0gMSksICtiYWxsLnRvcC5zbGljZSgwLCBiYWxsLnRvcC5sZW5ndGggLSAxKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vdmltZW50LmtpbmVtYXRpYyA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgYmFsbC50cmFuc2Zvcm0gPSAncm90YXRlKCcgKyB4ICogMTIgKyAnZGVnKSc7IC8vIHJvdGF0ZXMgdGhlIGJhbGwgb24gaXRzIG93biBheGlzXG4gICAgaWYgKHggPj0gZ2xvYmFsLnJpZ2h0V2FsbCB8fCB4IDw9IGdsb2JhbC5sZWZ0V2FsbCkgeyAvLyB3aGVuIGJhbGwgaGl0cyB0aGUgd2FsbFxuICAgICAgICB4ID0geCA+PSBnbG9iYWwucmlnaHRXYWxsID8gZ2xvYmFsLnJpZ2h0V2FsbCAtIDAuMSA6IGdsb2JhbC5sZWZ0V2FsbCArIDAuMTsgLy8gc2V0IHggdG8gMC4xJSBhd2F5IGZyb20gdGhlIHdhbGwgdG8gYXZvaWQgYnVnc1xuICAgICAgICBzb3VuZC5wbGF5U291bmQoMSk7XG4gICAgICAgIGdsb2JhbC5oU3BlZWQgKj0gLTAuOTsgICAgICAvLyBjaGFuZ2UgYmFsbCBkaXJlY3Rpb25cbiAgICAgICAgZ2xvYmFsLmhBY2NlbGVyYXRpb24gKj0gLTE7IC8vIGFuZCByZWR1Y2VzIGl0J3Mgc3BlZWQgYSBiaXRcbiAgICB9XG5cbiAgICBpZiAoZ2xvYmFsLmhTcGVlZCA8IGdsb2JhbC5sb3dMaW1pdCAmJiBnbG9iYWwuaFNwZWVkID4gLWdsb2JhbC5sb3dMaW1pdCkgeyAvLyBpZiBiYWxsIGdldHMgdmVyeSBzbG93XG4gICAgICAgIGdsb2JhbC5oU3BlZWQgPSAwOyAvLyBzdG9wIGJhbGwgaG9yaXpvbnRhbGx5XG4gICAgICAgIGlmIChnbG9iYWwudm9sdW1lIDwgMC4xNjkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gaWYgYmFsbCBpcyB0b28gbG93IHJldHVybnMgMSBzbyBmYWxsL2p1bXAgd2lsbCBzdG9wIHRoZSBiYWxsIHZlcnRpY2FsbHlcbiAgICB9IGVsc2UgeyAvLyBpZiB0aGUgYmFsbCBpcyBub3QgdG9vIHNsb3cgcmVkdWNlIGl0J3Mgc3BlZWRcbiAgICAgICAgZ2xvYmFsLmhTcGVlZCArPSBnbG9iYWwuaEFjY2VsZXJhdGlvbjtcbiAgICB9XG4gICAgYmFsbC5sZWZ0ID0geCArICclJzsgLy8gbW92ZSB0aGUgYmFsbCB0byB4XG4gICAgZ2xvYmFsLmxvb3BzKys7IC8vIFwibG9vcHNcIiBpbmNyZWFzZXMgb24gZmFsbCBhbmQganVtcCwgaXQncyB1c2VkIHRvIHNldCBzb3VuZCB2b2x1bWVcbiAgICByZXR1cm4geDtcbn1cblxubW92aW1lbnQuZmFsbCA9IGZ1bmN0aW9uICh4ID0gMCwgeSA9IDApIHtcbiAgICAvKiBpZiBubyBhcmd1bWVudCBpcyBwYXNzZWQsIHRoZSBiYWxsIHN0YXJ0c1xuICAgIGF0IHRoZSB0b3AgbGVmdCBvZiB0aGUgd2luZG93ICovXG4gICAgeCA9IG1vdmltZW50LmtpbmVtYXRpYyh4LCB5KTsgLy8gc2V0cyBmYWxsJ3MgeCB0byBraW5lbWF0aWMncyB4XG4gICAgaWYgKHggPT09IGZhbHNlKSB7IC8vIGlmIGtpbmVtYXRpYyByZXR1cm5zIGZhbHNlIFxuICAgICAgICB5ID0gZ2xvYmFsLmdyb3VuZDsgLy8gc3RvcCB0aGUgYmFsbCB2ZXJ0aWNhbGx5XG4gICAgICAgIHJldHVybjsgLy8gYnJlYWsgZnVuY3Rpb25zIGZhbGwgYW5kIGp1bXBcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIG5lZWRzIHRpbWVvdXQgc28gdGhlIHJlY3Vyc2l2ZSBmdW5jdGlvbnMgZG9uJ3QgY3Jhc2ggdGhlIGFwcFxuICAgICAgICBnbG9iYWwuZyArPSBnbG9iYWwuZ3Jhdml0eTsgLy8gXCJncmF2aXR5XCIgKHNwZWVkIHdpbGwgYmUgaW5jcmVhc2luZyB1bnRpbCBpdCByZWFjaGVzIHRoZSBncm91bmQpXG4gICAgICAgIGJhbGwudG9wID0geSArICclJzsgLy8gcG9zaXRpb24gdGhlIGJhbGxcbiAgICAgICAgaWYgKHkgPCBnbG9iYWwuZ3JvdW5kKSB7IC8vIGlmIHRoZSBiYWxsIGhhc24ndCBoaXQgdGhlIGdyb3VuZFxuICAgICAgICAgICAgbW92aW1lbnQuZmFsbCh4ICsgZ2xvYmFsLmhTcGVlZCwgeSArIGdsb2JhbC5nKTsgLy8gY29udGludWUgZmFsbGluZyBhbmQgZ29pbmcgaG9yaXpvbnRhbGx5XG4gICAgICAgIH0gZWxzZSB7IC8vIHdoZW4gYmFsbCBoaXRzIHRoZSBncm91bmRcbiAgICAgICAgICAgIHNvdW5kLnBsYXlTb3VuZCgpO1xuICAgICAgICAgICAgbW92aW1lbnQuanVtcCh4ICsgZ2xvYmFsLmhTcGVlZCk7IC8vIGNhbGwganVtcCBwYXNzaW5nIGJhbGwncyBjdXJyZW50IHggcG9zaXRpb25cbiAgICAgICAgfVxuICAgIH0sIGdsb2JhbC52U3BlZWQpOyAvLyBzcGVlZCBvZiB0aGUgcHJvZ3JhbSAodGhlIG1vcmUgdGhlIHNsb3dlcilcbn1cblxuXG5tb3ZpbWVudC5qdW1wID0gZnVuY3Rpb24gKHgsIHkgPSBnbG9iYWwuZ3JvdW5kKSB7XG4gICAgLyogaWYgdGhlcmUgaXMgbm8geSBhcmd1bWVudCB0aGUgZnVuY3Rpb24gd2FzIGNhbGxlZCBmcm9tIGZhbGxcbiAgICB3aWNoIG1lYW5zIHRoZSBiYWxsIGlzIG9uIHRoZSBncm91bmQqL1xuICAgIHggPSBtb3ZpbWVudC5raW5lbWF0aWMoeCwgeSk7IC8vIHNldHMgZmFsbCdzIHggdG8ga2luZW1hdGljJ3MgeFxuICAgIGlmICh4ID09PSBmYWxzZSkgeyAvLyBpZiBraW5lbWF0aWMgcmV0dXJucyBmYWxzZSBcbiAgICAgICAgeSA9IGdsb2JhbC5ncm91bmQ7IC8vIHN0b3AgdGhlIGJhbGwgdmVydGljYWxseVxuICAgICAgICByZXR1cm47IC8vIGJyZWFrIGZ1bmN0aW9ucyBmYWxsIGFuZCBqdW1wXG4gICAgfVxuICAgIGlmKHkgPD0gMCkge1xuICAgICAgICBzb3VuZC5wbGF5U291bmQoMSk7XG4gICAgICAgIG1vdmltZW50LmZhbGwoeCwgeSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7IC8vIG5lZWRzIHRpbWVvdXQgc28gdGhlIHJlY3Vyc2l2ZSBmdW5jdGlvbnMgZG9uJ3QgY3Jhc2ggdGhlIGFwcFxuICAgICAgICBnbG9iYWwuZyAtPSBnbG9iYWwuZ3Jhdml0eSAqIDEuNDsgLy8gXCJncmF2aXR5XCIgKHNwZWVkIHdpbGwgYmUgZGVjcmVhc2luZyB1bnRpbCBpdCBnZXRzIHRvIHplcm8pXG4gICAgICAgIGJhbGwudG9wID0geSArICclJzsgLy8gcG9zaXRpb24gdGhlIGJhbGxcbiAgICAgICAgaWYgKGdsb2JhbC5nID49IDApIHsgLy8gaWYgdGhlIGJhbGwgaGFzIHZlcnRpY2FsIHNwZWVkXG4gICAgICAgICAgICBtb3ZpbWVudC5qdW1wKHggKyBnbG9iYWwuaFNwZWVkLCB5IC0gZ2xvYmFsLmcpOyAvLyBjb250aW51ZSBnb2luZyB1cCBhbmQgaG9yaXpvbnRhbGx5XG4gICAgICAgIH0gZWxzZSB7IC8vIGlmIHNwZWVkIHJlYWNocyAwXG4gICAgICAgICAgICBtb3ZpbWVudC5mYWxsKHggKyBnbG9iYWwuaFNwZWVkLCB5KTsgLy8gc3RhcnQgZmFsbGluZyBmcm9tIGJhbGwncyBjdXJyZW50IHggYW5kIHkgcG9zaXRpb25cbiAgICAgICAgICAgIGdsb2JhbC52b2x1bWUgPSAoMTAwIC0geSkgLyAxMDA7IC8vIHNldHMgc291bmQgdm9sdW1lIHJlbGF0aXZlIHRvIHRoZSBmYWxsIGhlaWdodFxuICAgICAgICB9XG4gICAgfSwgZ2xvYmFsLnZTcGVlZCk7IC8vIHNwZWVkIG9mIHRoZSBwcm9ncmFtICh0aGUgbW9yZSB0aGUgc2xvd2VyKVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL21vdmltZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJsZXQgc291bmQgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xubGV0IGdsb2JhbCA9IHJlcXVpcmUoJy4vZ2xvYmFsX3ZhcmlhYmxlcycpO1xuXG5zb3VuZC5wbGF5U291bmQgPSBmdW5jdGlvbih3YWxsKSB7XG4gICAgaWYgKGdsb2JhbC52b2x1bWUgPiAwLjE2OSB8fCB3YWxsKSB7IC8vIGlmIHNvdW5kJ3Mgdm9sdW1lIGlzIHRvbyBzbWFsbCBkb24ndCBwbGF5IGl0IGF0IGFsbFxuICAgICAgICBsZXQgc291bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXVkaW8tYmFsbCcpOyAvLyBnZXRzIGh0bWwgYXVkaW8gdGFnXG5cbiAgICAgICAgLyogc2V0cyB0aGUgdm9sdW1lIGJhc2VkIG9uIHRoZSBoZWlnaHQgb2YgdGhlIGZhbGwgXG4gICAgICAgIGFuZCBob3cgbWFueSBsb29wcyB0aGUgcHJvZ3JhbSBkaWQgKi9cbiAgICAgICAgbGV0IHNWb2x1bWUgPSBnbG9iYWwudm9sdW1lIC0gZ2xvYmFsLmxvb3BzIC8gMjUwMDA7XG4gICAgICAgIGlmKHNWb2x1bWUgPD0gMSAmJiBzVm9sdW1lID49IDApIHtcbiAgICAgICAgICAgIHNvdW5kLnZvbHVtZSA9IHNWb2x1bWU7XG4gICAgICAgIH1cbiAgICAgICAgc291bmQuY3VycmVudFRpbWUgPSAwOyAvLyBzdG9wIGN1cnJlbnQgc291bmQgYmVmb3JlIHBsYXlpbmcgYW5vdGhlciBvbmVcbiAgICAgICAgc291bmQucGxheSgpOyAvLyBwbGF5IHRoZSBzb3VuZCB3aGVuIHRoZSBiYWxsIGhpdHMgdGhlIGdyb3VuZCBvciB3YWxsXG4gICAgfSBlbHNlIHsgLy8gaWYgdGhlIGJhbGwgaXMgcm9sbGluZyBvbiB0aGUgZ3JvdW5kIChub3QganVtcGluZyBhbnkgbW9yZSlcbiAgICAgICAgaWYgKGdsb2JhbC5mcmljdGlvbkZsYWcgPT09IDApIGdsb2JhbC5oQWNjZWxlcmF0aW9uICo9IDIuNTtcbiAgICAgICAgLy8gaW5jcmVhc2UgZnJpY3Rpb24gYmVjYXVzZSBiYWxsIGlzIGluIGNvbnRhbnQgY29udGFjdCB3aXRoIHRoZSBncm91bmRcbiAgICAgICAgZ2xvYmFsLmZyaWN0aW9uRmxhZyA9IDE7IC8vIGRvIHRoaXMganVzdCBvbmUgdGltZVxuICAgIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9zb3VuZC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==
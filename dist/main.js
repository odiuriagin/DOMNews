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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n    constructor(nodes) {\n        this.nodes = nodes;\n    }\n\n    html(string = null) {\n        if (string === null) {\n            return this.nodes[0].innerHTML;\n        } else {\n            this.nodes.forEach( (node) => node.innerHTML = string);\n            return this.nodes;\n        }\n    }\n\n    empty() {\n        this.html('');\n    }\n\n    append(el) {\n        let html = \"\";\n        if (el instanceof DOMNodeCollection) {\n            el.nodes.forEach( (node) => {\n                html += node.outerHTML;\n            });\n        } else if (el instanceof HTMLElement) {\n            html += el.outerHTML;\n        } else if (typeof el === 'string') {\n            html = el;\n        }\n\n        this.nodes.forEach( (node) => {\n            node.innerHTML += html;\n        });\n\n        return this.nodes;\n    }\n\n    attr(key, value) {\n        if (typeof value === \"string\") {\n            this.nodes.forEach( (node) => node.setAttribute(key, value));\n        } else {\n            return this.nodes[0].getAttribute(key);\n        }\n      }\n    \n    addClass(string) {\n        this.nodes.forEach( (node) => node.classList.add(string.trim()));\n        return this.nodes;\n    }\n\n    removeClass(string) {\n        this.nodes.forEach( (node) => node.classList.remove(string));\n        return this.nodes;\n    }\n\n    toggleClass(string) {\n        this.nodes.forEach ( (node) => {\n            if (node.classList.contains(string)) {\n                node.classList.remove(string);\n            } else {\n                node.classList.add(string.trim());\n            }\n        });\n        return this.nodes;\n    }\n\n    children() {\n        let arr = [];\n        this.nodes.forEach((node) => {\n            arr = arr.concat(Array.from(node.children));\n        });\n        return new DOMNodeCollection(arr);\n    }\n\n    parent() {\n        let arr = [];\n        this.nodes.forEach((node) => {\n            arr = arr.concat(node.parentElement);\n        });\n        return new DOMNodeCollection(arr);\n    }\n\n    find(selector) {\n        let arr = [];\n        this.nodes.forEach((node) => {\n            arr = arr.concat(Array.from(node.querySelectorAll(selector)));\n        });\n        return new DOMNodeCollection(arr);\n    }\n\n    remove(selector = null) {\n        if (selector === null) {\n            this.nodes.forEach((node) => {\n            node.remove();\n            });\n        } else {\n            const toRemove = document.querySelectorAll(`${this.node.tagName}${selector}`);\n            toRemove.nodes.forEach( (node) => node.remove() );\n        }\n    }\n\n    on(eventType, callback) {\n        this.nodes.forEach( (node) => {\n            node.addEventListener(eventType, callback);\n            const event = `jqliteEvent-${eventType}`;\n            if (typeof node[event] === \"undefined\") {\n                node[event] = [];\n            }\n            node[event].push(callback);\n        });\n    }\n\n    off(eventType) {\n        this.nodes.forEach( (node) => {\n            const event = `jqliteEvent-${eventType}`;\n            if (node[event]) {\n                node[event].forEach( (callback) => {\n                    node.removeEventListener(eventType, callback);\n                });\n            }\n        });\n    };\n\n}\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\nlet callbacksArr = [];\nlet ready = false;\n\nwindow.$l = (queryArg) => {\n    let nodesArr;\n    if (queryArg instanceof HTMLElement) {\n        nodesArr = [queryArg];\n    } else if (queryArg && {}.toString.call(queryArg) === '[object Function]') {\n        return addCallbackToDocReady(queryArg);\n    } else if (queryArg[0] === \"<\") {\n        nodesArr = [document.createElement(queryArg.split(\"<\")[1].split(\">\")[0])];\n    } else {\n        nodesArr = Array.from(document.querySelectorAll(queryArg));\n    }\n    return new DOMNodeCollection(nodesArr);\n}\n\naddCallbackToDocReady = (callback) => {\n    if (ready) {\n        callback();\n    } else {\n        callbacksArr.push(callback);\n    }\n}\n\n$l.extend = (base, ...otherObjects) => {\n    otherObjects.forEach( (obj) => {\n        for (const prop in obj) {\n            base[prop] = obj[prop];\n        }\n    });\n    return base;\n}\n\n$l.ajax = (options) => {\n    \n    const defaults = {\n      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n      method: \"GET\",\n      url: \"\",\n      success: () => {},\n      error: () => {},\n      data: {},\n      dataType: 'json',\n    };\n    options = $l.extend(defaults, options);\n    options.method = options.method.toUpperCase();\n\n    return new Promise((resolve, reject) => {\n        const xhr = new XMLHttpRequest();\n        xhr.open(options.method, options.url);\n        xhr.onload = () => {\n          if (xhr.status === 200) {\n            resolve(JSON.parse(xhr.response));\n          } else {\n            reject(JSON.parse(xhr.response));\n          }\n        };\n        xhr.send(JSON.stringify(options.data));\n      })\n  };\n  \n\ndocument.addEventListener('DOMContentLoaded', () => {\n    ready = true;\n    callbacksArr.forEach( (callback) => callback());\n});\n\n\n$l( () => {\n    const buttonEl = $l('.news-button');\n    buttonEl.on('click', () => getNews());\n});\n\ngetNews = () => {\n    const $input = $(\".news-subject\").val();\n    event.preventDefault();\n    $l.ajax({method: 'get', url: `https://newsapi.org/v2/everything?q=${$input}&apiKey=47feb2c99f604fe2bb308b7ffd24335d`})\n    .then((result) => handleResult(result))\n}\n\nhandleResult = (result) => {\n    let articleNumber = getRandomNumber();\n    setTitle(result, articleNumber);\n    setImage(result, articleNumber);\n    setContent(result, articleNumber);\n    setLink(result, articleNumber);\n    addButton();\n    handleSpin();\n    console.log(result);\n}\n\ngetRandomNumber = () => {\n    return Math.floor((Math.random() * 20));\n};\n\nsetTitle = (result, articleNumber) => {\n    let $title = $l('.news-title');\n    $title.html(result.articles[articleNumber].title);\n}\n\nsetImage = (result, articleNumber) => {\n    let imageUrl = result.articles[articleNumber].urlToImage;\n    let $image = $l('.news-image');\n    $image.attr('src', imageUrl);\n}\n\nsetContent = (result, articleNumber) => {\n    $content = $l('.news-content');\n    $content.html(result.articles[articleNumber].description)\n}\n\nsetLink = (result, articleNumber) => {\n    let linkAddress = result.articles[articleNumber].url;\n    let source = result.articles[articleNumber].source.name;\n    $link = $l('.news-link');\n    $link.attr('href', linkAddress);\n    $link.html(`Read More On \"${source}\"`);\n}\n\naddButton = () => {\n    $newsBlock = $l('.news');\n    $button = $l('<button></button>');\n    $button.html('SPIN IMAGE');\n    $button.addClass('spin-button');\n    $newsBlock.append($button);\n}\n\nhandleSpin = () => {\n    let $button = $l('.spin-button');\n    let $image = $l('.news-image');\n    $button.on('click', () => {\n        $image.toggleClass('rotate-image');\n        let text = $button.html() === 'SPIN IMAGE' ? 'STOP SPINNING' : 'SPIN IMAGE';\n        $button.html(text);\n    });\n}\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
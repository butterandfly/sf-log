(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["sfLog"] = factory(require("jQuery"));
	else
		root["sfLog"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var sfEcho = __webpack_require__(2);
	var $ = __webpack_require__(1);

	function isFunc(val) {
	  if (typeof val === "function") {
	    return true;
	  }
	  return false;
	}


	var callback = function (msg) {
	  window.___log(msg);
	};

	function init(options) {
	  // 查找jquery
	  if (!$) {
	    console.error('sfLog需要jquery，没能找到jQuery');
	    return;
	  }

	  options = options || {};
	  // 使用自定义callback，或使用window.___log
	  if (isFunc(options.callback)) {
	    callback = options.callback;
	  } else {
	    if (!isFunc(window.___log)) {
	      console.error('找不到___log方法，请使用自定义的callback');
	      return;
	    }
	  }

	  initSfLogElements();
	}

	// 初始化所有带有sf-log的元素
	function initSfLogElements() {
	  $('[sf-log]').each(function () {
	    var jqElm = $(this),
	      eventName = jqElm.attr('sf-log-event'),
	      logMsg = jqElm.attr('sf-log');

	    // 默认使用click事件
	    if (!eventName) {
	      eventName = 'click';
	    }

	    var execFunc = sfEcho.createExecFunc(logMsg, 'self');

	    jqElm.on(eventName, function () {
	      var msg = logMsg;
	      if (execFunc) {
	        msg = sfEcho.replaceEntry(msg, execFunc(jqElm));
	      }

	      callback(msg);
	    });
	  });
	}

	var sfLog = {
	  init: init
	};

	module.exports = sfLog;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var sfEcho = {
	  hasEntry: hasEntry,
	  getEntry: getEntry,
	  replaceEntry: replaceEntry,
	  createExecFunc: createExecFunc
	}


	var entryRe = new RegExp("\\$\\{[^\\$]*\\}", 'g');

	/**
	 * 判断str是否有代码入口
	 *
	 * @param str
	 * @returns {boolean}
	 */
	function hasEntry(str) {
	  var entryResults = str.match(entryRe);
	  if (entryResults && entryResults[0]) {
	    return true;
	  }
	  return false;
	}

	/**
	 * 取得str的代码入口段，若没有则返回null
	 *
	 * @param str
	 * @returns {*}
	 */
	function getEntry(str) {
	  var entryResults = str.match(entryRe);
	  if (entryResults && entryResults[0]) {
	    return entryResults[0];
	  }
	  return null;
	}

	/**
	 * 将str中的代码入口段替换成replaceContent
	 *
	 * @param str
	 * @param replaceContent
	 * @returns {XML|string|void}
	 */
	function replaceEntry(str, replaceContent) {
	  return str.replace(entryRe, replaceContent);
	}


	/**
	 * 从代码入口entryStr中取得js代码
	 * 如，若参数为'${name}'，则返回'name'
	 *
	 * @param entryStr
	 * @returns {*}
	 */
	function getJsExpFromEntry(entryStr) {
	  var jsExpRe = new RegExp("[^\\$\\{\\}]+", "g");
	  var result = entryStr.match(jsExpRe);

	  if (result && result[0]) {
	    return result[0].trim();
	  }

	  return null;
	}

	function createExecFunc(str, scopeName) {
	  var entry = getEntry(str);
	  if (!entry) {
	    return null;
	  }

	  var jsExp = getJsExpFromEntry(entry);
	  if (!jsExp) {
	    return null;
	  }

	  var execFunc = new Function(scopeName, "return " + jsExp);
	  return execFunc;
	}


	module.exports = sfEcho;


/***/ }
/******/ ])
});
;
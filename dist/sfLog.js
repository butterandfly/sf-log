// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.sfEcho = factory();
  }
}(this, function () {
  //var sfEcho = {};
  //var exportProp = {
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


  function createExecFuncFromJsExp(jsExp, scopeName) {
    var execFunc = new Function(scopeName, "return " + jsExp);
    return execFunc;
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


  return sfEcho;
}));
- function(window) {
  "use strict";

  function isFunc (val) {
    if (typeof val === "function") {
      return true;
    }
    return false;
  }

  var sfLog = {
    init: init
  };
  window.sfLog = sfLog;

  var callback = function(msg) {
    window.___log(msg);
  };

  function init(options) {
    // 查找jquery
    if (!window.$) {
      console.error('sfLog需要jquery，没能找到$');
      return;
    }

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
    $('[sf-log]').each(function() {
      var jqElm = $(this),
        eventName = jqElm.attr('sf-log-event'),
        logMsg = jqElm.attr('sf-log');

      // 默认使用click事件
      if (!eventName) {
        eventName = 'click';
      }

      var execFunc = sfEcho.createExecFunc(logMsg, 'self');

      jqElm.on(eventName, function() {
        var msg = logMsg;
        if (execFunc) {
          msg = sfEcho.replaceEntry(msg, execFunc(jqElm));
        }

        callback(msg);
      });
    });
  }
}(window);
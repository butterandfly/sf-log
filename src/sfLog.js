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
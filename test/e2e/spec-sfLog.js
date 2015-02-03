// spec.js
describe('"sfLog" object', function() {
  global.dv = browser.driver;

  beforeEach(function() {
    dv.get('http://localhost:8091/test/e2e/log.html');
  });

  it('should be found in global', function() {
    expect(typeof dv.executeScript('return window.sfLog;')).toBe('object');
  });

  describe('should let the elements listen event when after init', function() {
    it(' and execute the custom callback', function() {
      var logBtn = dv.findElement(by.id('log-btn'));

      var execScript = function() {
        window.sfLog.init({callback: function() {
          window.logBtnClicked = true;
        }});
      };

      dv.executeScript(execScript);
      logBtn.click();
      expect(dv.executeScript('return window.logBtnClicked')).toBe(true);
    });

    it(' and execute the global ___log function', function() {
      var logBtn = dv.findElement(by.id('log-btn'));

      var execScript = function() {
        window.___log = function() {
          window.logBtnClicked = 7;
        }
        window.sfLog.init({});
      };

      dv.executeScript(execScript);
      logBtn.click();
      expect(dv.executeScript('return window.logBtnClicked')).toBe(7);
    })

  });


});
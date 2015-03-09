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

var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var sfEcho = require('../src/sfEcho.js');

var forEach = function(list, callback) {
  for (var i = 0, len = list.length; i < len; i++) {
    var item = list[i];
    callback(item, i);
  }
}

describe('Function hasEntry', function() {
  it('should check the string if it has an entry', function() {


    var testList = [
      {str: '结果：${ self.name }', expected: true},
      {str: '结果： ${self.name} ', expected: true},
      {str: '结果：$ {self.name}', expected: false},
      {str: '结果：{self.name}', expected: false},
      {str: '${self.name}', expected: true},
    ];

    for (var i = 0, len = testList.length; i < len; i++) {
      var item = testList[i];
      var actual = sfEcho.hasEntry(item.str);
      actual.should.equal(item.expected);
    }
  });
});

describe('Function replaceEntry', function() {
  it('should replace the entry', function() {
    var testList = [
      {str: '${self.name}', replaceStr: '1', expected: '1'},
      {str: '结果：${self.name}', replaceStr: '1', expected: '结果：1'}
    ];

    forEach(testList, function(item) {
      sfEcho.replaceEntry(item.str, item.replaceStr).should.equal(item.expected);
    });
  });

});

describe('Function createExecFunc', function() {
  it('should not create anything while the input has no entry', function() {
    expect(sfEcho.createExecFunc('123', 'self')).to.equal(null);
    expect(sfEcho.createExecFunc('123${}', 'self')).to.equal(null);
    expect(sfEcho.createExecFunc('123${"hi"}', 'self')).to.not.equal(null);
  });

  it('should create a executing function that can get the right answer', function() {
    var self = {
      name: 'Zero',
      getId: function(id) {
        return id;
      }
    };

    var testList = [
      {str: 'I am ${self.name}.', scopeName: 'self', expected:'Zero'},
      {str: 'am ${ self.name }.', scopeName: 'self', expected:'Zero'},
      {str: "I am the ${self.getId('7')}.", scopeName: 'self', expected:'7'}
    ];

    forEach(testList, function(item) {
      var execFunc = sfEcho.createExecFunc(item.str, item.scopeName);
      expect(execFunc(self)).to.equal(item.expected);
    })
  });
});

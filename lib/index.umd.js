(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.$utils = factory());
})(this, (function () { 'use strict';

  class Tools {
    constructor() {
      console.log('init');
    }
    getType() {
      return 'fn';
    }
  }

  return Tools;

}));

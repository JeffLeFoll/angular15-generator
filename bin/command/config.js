'use strict';

let Locales = require('../locales/locales');
const y18n = new Locales();

exports.command = 'c';
exports.desc = y18n.localized('configDesc');
exports.builder = {};
exports.handler = function (argv) {
  console.log('init called for dir', argv.dir)
};
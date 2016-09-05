'use strict';

let Locales = require('../locales/locales');
const y18n = new Locales();
const ConfigGenerator = require('../../src/configGenerator');

exports.command = 'config';
exports.desc = y18n.localized('configDesc');
exports.builder = {};
exports.handler = function (argv) {
  ConfigGenerator.writeDefaultConfigFile();
};
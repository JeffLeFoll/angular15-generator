'use strict';

let Locales = require('../locales');
const y18n = new Locales();
const ConfigGenerator = require('../../generator/configGenerator');

exports.command = 'config';
exports.desc = y18n.localized('configDesc');
exports.builder = {};
exports.handler = function (argv) {
  ConfigGenerator.writeDefaultConfigFile();
};
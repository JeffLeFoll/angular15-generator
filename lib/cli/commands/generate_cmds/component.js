'use strict';

let Locales = require('../../locales');
const y18n = new Locales();
const ComponentGenerator = require('../../../generator/componentGenerator');
const ConfigResolver = require('../../../generator/configResolver');

exports.command = 'component <name>';
exports.desc = y18n.localized('componentDesc');
exports.builder = {};
exports.handler = function (argv) {
  var cg = new ComponentGenerator(argv.name, new ConfigResolver());
  cg.buildComponent();
};
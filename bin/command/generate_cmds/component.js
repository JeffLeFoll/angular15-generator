'use strict';

let Locales = require('../../locales/locales');
const y18n = new Locales();
const ComponentGenerator = require('../../../src/js/componentGenerator');

exports.command = 'component <name>';
exports.desc = 'Generate a component named <name>';
exports.builder = {};
exports.handler = function (argv) {
  var cg = new ComponentGenerator(argv.name);
  cg.buildComponent();
};
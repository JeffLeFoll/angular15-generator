'use strict';

let Locales = require('../../locales/locales');
const y18n = new Locales();
const RouteGenerator = require('../../../src/routeGenerator');
const ConfigResolver = require('../../../src/configResolver');

exports.command = 'route <name>';
exports.desc = y18n.localized('routeDesc');
exports.builder = {};
exports.handler = function (argv) {
  var rg = new RouteGenerator(argv.name, new ConfigResolver());
  rg.buildRoute();
};
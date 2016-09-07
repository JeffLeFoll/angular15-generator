'use strict';

let Locales = require('../../locales');
const y18n = new Locales();
const RouteGenerator = require('../../../generator/routeGenerator');
const ConfigResolver = require('../../../generator/configResolver');

exports.command = 'route <name>';
exports.desc = y18n.localized('routeDesc');
exports.builder = {};
exports.handler = function (argv) {
  var rg = new RouteGenerator(argv.name, new ConfigResolver());
  rg.buildRoute();
};
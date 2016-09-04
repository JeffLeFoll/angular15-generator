'use strict';

let Locales = require('../../locales/locales');
const y18n = new Locales();
const RouteGenerator = require('../../../src/js/routeGenerator');

exports.command = 'route <name>';
exports.desc = 'Generate a route component named <name>';
exports.builder = {};
exports.handler = function (argv) {
  var rg = new RouteGenerator(argv.name);
  rg.buildRoute();
};
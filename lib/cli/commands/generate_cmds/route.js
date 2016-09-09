'use strict';

let Locales = require('../../locales');
const y18n = new Locales();
const RouteGenerator = require('../../../generator/routeGenerator');
const ConfigResolver = require('../../../generator/configResolver');

exports.command = 'route <name>';
exports.desc = y18n.localized('routeDesc');
exports.builder = {
  updateOrCreate: {
    alias: 'uc',
    describe: y18n.localized('ucDesc')
  }
};
exports.handler = function (argv) {
  var rg = new RouteGenerator(argv.name, new ConfigResolver());
  rg.buildRoute();

  if(argv.updateOrCreate != null) {
    rg.updateOrCreateRootModule(argv.updateOrCreate);
  }
};
'use strict';

let Locales = require('../../locales');
let y18n = new Locales();
let RouteGenerator = require('../../../generator/routeGenerator');
let ConfigResolver = require('../../../generator/configResolver');
let RootIndexGenerator = require('../../../generator/rootIndexGenerator');

exports.command = 'route <name>';
exports.desc = y18n.localized('routeDesc');
exports.builder = {
  updateOrCreate: {
    alias: 'uc',
    describe: y18n.localized('ucDesc')
  }
};
exports.handler = function (argv) {
  let configResolver = new ConfigResolver();
  let rootIndexGenerator = new RootIndexGenerator(argv.name);

  let rg = new RouteGenerator(argv.name, configResolver, rootIndexGenerator);
  rg.buildRoute();

  let createOrUpdate = argv.updateOrCreate != undefined || configResolver.getUpdateOrCreate();
  if (createOrUpdate) {
    rg.updateOrCreateRootModule(createOrUpdate);
  }
};

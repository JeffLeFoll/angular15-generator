'use strict';

let Locales = require('../../locales');
let y18n = new Locales();
let ServiceGenerator = require('../../../generator/serviceGenerator');
let ConfigResolver = require('../../../generator/configResolver');
let RootIndexGenerator = require('../../../generator/rootIndexGenerator');

exports.command = 'service <name>';
exports.desc = y18n.localized('serviceDesc');
exports.builder = {
  updateOrCreate: {
    alias: 'uc',
    describe: y18n.localized('ucDesc')
  }
};
exports.handler = function (argv) {
  let configResolver = new ConfigResolver();
  let rootIndexGenerator = new RootIndexGenerator(argv.name);

  let cg = new ServiceGenerator(argv.name, configResolver, rootIndexGenerator);
  cg.buildService();

  let createOrUpdate = argv.updateOrCreate != undefined || configResolver.getUpdateOrCreate();
  if (createOrUpdate) {
    cg.updateOrCreateRootModule(createOrUpdate);
  }
};

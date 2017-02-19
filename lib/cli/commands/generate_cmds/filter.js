'use strict';

let Locales = require('../../locales');
let y18n = new Locales();
let FilterGenerator = require('../../../generator/filterGenerator');
let ConfigResolver = require('../../../generator/configResolver');
let RootIndexGenerator = require('../../../generator/rootIndexGenerator');

exports.command = 'filter <name>';
exports.desc = y18n.localized('filterDesc');
exports.builder = {
  updateOrCreate: {
    alias: 'uc',
    describe: y18n.localized('ucDesc')
  }
};
exports.handler = function (argv) {
  let configResolver = new ConfigResolver();
  let rootIndexGenerator = new RootIndexGenerator(argv.name);

  let cg = new FilterGenerator(argv.name, configResolver, rootIndexGenerator);
  cg.buildFilter();

  let createOrUpdate = argv.updateOrCreate != undefined || configResolver.getUpdateOrCreate();
  if (createOrUpdate) {
    cg.updateOrCreateRootModule(createOrUpdate);
  }
};

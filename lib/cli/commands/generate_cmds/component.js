'use strict';

let Locales = require('../../locales');
let y18n = new Locales();
let ComponentGenerator = require('../../../generator/componentGenerator');
let ConfigResolver = require('../../../generator/configResolver');
let RootIndexGenerator = require('../../../generator/rootIndexGenerator');

exports.command = 'component <name>';
exports.desc = y18n.localized('componentDesc');
exports.builder = {
  updateOrCreate: {
    alias: 'uc',
    describe: y18n.localized('ucDesc')
  }
};
exports.handler = function (argv) {
  let configResolver = new ConfigResolver();
  let rootIndexGenerator = new RootIndexGenerator(argv.name);

  let cg = new ComponentGenerator(argv.name, configResolver, rootIndexGenerator);
  cg.buildComponent();

  let createOrUpdate = argv.updateOrCreate != undefined || configResolver.getUpdateOrCreate();
  if (createOrUpdate) {
    cg.updateOrCreateRootModule(createOrUpdate);
  }
};

'use strict';

let Locales = require('../../locales');
const y18n = new Locales();
const ComponentGenerator = require('../../../generator/componentGenerator');
const ConfigResolver = require('../../../generator/configResolver');

exports.command = 'component <name>';
exports.desc = y18n.localized('componentDesc');
exports.builder = {
  updateOrCreate: {
    alias: 'uc',
    describe: y18n.localized('ucDesc')
  }
};
exports.handler = function (argv) {
  var cg = new ComponentGenerator(argv.name, new ConfigResolver());
  cg.buildComponent();

  if(argv.updateOrCreate != null) {
    cg.updateOrCreateRootModule(argv.updateOrCreate);
  }
};
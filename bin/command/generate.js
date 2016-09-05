'use strict';

let Locales = require('../locales/locales');
const y18n = new Locales();

exports.command = 'g <command>';
exports.desc = y18n.localized('generateDesc');
exports.builder = function (yargs) {
  return yargs.commandDir('generate_cmds');
};
exports.handler = function (argv) {};
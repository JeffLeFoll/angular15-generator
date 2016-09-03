#! /usr/bin/env node

const RouteGenerator = require('../src/js/routeGenerator');
const ComponentGenerator = require('../src/js/componentGenerator');

var argv = require('yargs').argv;
var commandeName = argv._[0];
var name = argv._[1];

if (commandeName === 'route') {
  var rg = new RouteGenerator(name);
  rg.buildRoute();

} else if (commandeName === 'component') {
  var cg = new ComponentGenerator(name);
  cg.buildComponent();

}
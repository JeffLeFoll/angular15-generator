'use strict';

let fse = require('fs-extra');
let expect = require('chai').expect;
const ConfigGenerator = require('./configGenerator');
const defaultConfFile = require('./templates/config/config.json');

describe('ConfigGenerator functionalities', function () {

  before(function () {
    ConfigGenerator.writeDefaultConfigFile();
  });

  it("should write the default conf file", function () {

    let generatedConfFile = require('../../angular-generator.config.json');

    expect(generatedConfFile.componentsRoot).to.equal(defaultConfFile.componentsRoot);
    expect(generatedConfFile.componentsRootModuleName).to.equal(defaultConfFile.componentsRootModuleName);
    expect(generatedConfFile.routesRoot).to.equal(defaultConfFile.routesRoot);
    expect(generatedConfFile.routesRootModuleName).to.equal(defaultConfFile.routesRootModuleName);
    expect(generatedConfFile.servicesRoot).to.equal(defaultConfFile.servicesRoot);
    expect(generatedConfFile.servicesRootModuleName).to.equal(defaultConfFile.servicesRootModuleName);
    expect(generatedConfFile.filtersRoot).to.equal(defaultConfFile.filtersRoot);
    expect(generatedConfFile.filtersRootModuleName).to.equal(defaultConfFile.filtersRootModuleName);
    expect(generatedConfFile.updateOrCreate).to.equal(defaultConfFile.updateOrCreate);
    expect(generatedConfFile.useWebpackRequire).to.equal(defaultConfFile.useWebpackRequire);
  });

  after(function () {
    fse.removeSync('./angular-generator.config.json');
  });

});
'use strict';

let fse = require('fs-extra');
let expect = require('chai').expect;
let ConfigResolver = require('./configResolver');

describe('ConfigResolver functionalities', function () {

  it('should get the default components root', function () {

    let cg = new ConfigResolver();

    expect(cg.getComponentsRoot()).to.equal('src/app/components');
  });

  it('should get the default components root module name', function () {

    let cg = new ConfigResolver();

    expect(cg.getComponentsRootModuleName()).to.equal('index.ts');
  });

  it('should get the default routes root', function () {

    let cg = new ConfigResolver();

    expect(cg.getRoutesRoot()).to.equal('src/app/routes');
  });

  it('should get the default routes root module name', function () {

    let cg = new ConfigResolver();

    expect(cg.getRoutesRootModuleName()).to.equal('index.ts');
  });

  it('should get the default value for the update or create flag', function () {

    let cg = new ConfigResolver();

    expect(cg.getUpdateOrCreate()).to.be.false;
  });

  it('should get the default value to use or not wepback require', function () {

    let cg = new ConfigResolver();

    expect(cg.getUseWebpackRequire()).to.be.false;
  });

  it('should get the default services root', function () {

    let cg = new ConfigResolver();

    expect(cg.getServicesRoot()).to.equal('src/app/services');
  });

  it('should get the default services root module name', function () {

    let cg = new ConfigResolver();

    expect(cg.getServicesRootModuleName()).to.equal('index.ts');
  });

  it('should get the default filters root', function () {

    let cg = new ConfigResolver();

    expect(cg.getFiltersRoot()).to.equal('src/app/filters');
  });

  it('should get the default filters root module name', function () {

    let cg = new ConfigResolver();

    expect(cg.getFiltersRootModuleName()).to.equal('index.ts');
  });

  it("should get all its data from the custom conf file", function () {
    let customJsonData = {
      "componentsRoot": "src/cmp",
      "routesRoot": "src/rts",
      "componentsRootModuleName": "cmp.ts",
      "routesRootModuleName": "rts.ts",
      "updateOrCreate": true,
      "useWebpackRequire": true
    };

    fse.writeJsonSync('./angular-generator.config.json', customJsonData);

    let configResolver = new ConfigResolver();

    expect(configResolver.getComponentsRoot()).to.equal('src/cmp');
    expect(configResolver.getComponentsRootModuleName()).to.equal('cmp.ts');
    expect(configResolver.getRoutesRoot()).to.equal('src/rts');
    expect(configResolver.getRoutesRootModuleName()).to.equal('rts.ts');
    expect(configResolver.getUpdateOrCreate()).to.be.true;
    expect(configResolver.getUseWebpackRequire()).to.be.true;

    fse.removeSync('./angular-generator.config.json');
  });

});

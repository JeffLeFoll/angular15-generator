'use strict';

let path = require('path');
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

  it("should get all its data from the custom conf file", function () {
    let customJsonData = {  "componentsRoot": "src/cmp", "routesRoot": "src/rts",
      "componentsRootModuleName": "cmp.ts", "routesRootModuleName": "rts.ts"};

    fse.writeJsonSync('./angular-generator.config.json', customJsonData);

    let configResolver = new ConfigResolver();

    expect(configResolver.getComponentsRoot()).to.equal('src/cmp');
    expect(configResolver.getComponentsRootModuleName()).to.equal('cmp.ts');
    expect(configResolver.getRoutesRoot()).to.equal('src/rts');
    expect(configResolver.getRoutesRootModuleName()).to.equal('rts.ts');

    fse.removeSync('./angular-generator.config.json');
  });

});
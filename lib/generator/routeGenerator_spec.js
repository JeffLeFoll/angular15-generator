'use strict';

let expect = require('chai').expect;
let path = require('path');
let fse = require('fs-extra');

let ConfigResolver = require('./configResolver');
let RouteGenerator = require('./routeGenerator');
let RootIndexGenerator = require('./rootIndexGenerator');

const routeName = 'oAuth';
const capitalizedRouteName = 'OAuth';
const config = new ConfigResolver();
const testPath = path.join(config.getRoutesRoot(), routeName.toLowerCase());

describe('RouteGenerator functionalities', function () {

  it('should create the folder structure for the new route when initialized', function () {

    new RouteGenerator(routeName, config);

    checkIfDirectoriesExists(testPath);
  });

  it('should create all the files needed for the new route', function () {
    let rg = new RouteGenerator(routeName, config);

    rg.buildRoute();

    chekIfFilesExistsAndAreCorrects(testPath);
  });

  it('should write the root index file', function () {
    let rootIndexGenerator = new RootIndexGenerator(routeName);
    let rg = new RouteGenerator(routeName, config, rootIndexGenerator);

    rg.updateOrCreateRootModule(true);

    checkIfRootIndexIsCorrectlyCreated();
  });


  it('should create the folder structure with path alteration (foldr up)', function () {

    new RouteGenerator('../up/' + routeName, config);

    checkIfDirectoriesExists('src/app/up');
  });

  it('should create the folder structure with path alteration (folder down)', function () {

    new RouteGenerator('down/' + routeName, config);

    checkIfDirectoriesExists('src/app/routes/down');
  });

  it('should create all the files needed for the new route even with path alteration', function () {
    let rg = new RouteGenerator('down/' + routeName, config);

    rg.buildRoute();

    chekIfFilesExistsAndAreCorrects('src/app/routes/down' + '/' + routeName.toLowerCase());
  });

  it('should write the root index file with path alteration', function () {

    let rootIndexGenerator = new RootIndexGenerator('down/' + routeName);
    let rg = new RouteGenerator('down/' + routeName, config, rootIndexGenerator);

    rg.updateOrCreateRootModule(true);

    checkIfRootIndexIsCorrectlyCreatedWithPathAlteration();
  });

  it('should use the webpack require when specified in the config file', function () {
    let configCustom = new ConfigResolver();
    configCustom.customConfig = { "componentsRoot": "src/app/components", "routesRoot": "src/rts",
      "componentsRootModuleName": "cmp.ts", "routesRootModuleName": "rts.ts", "updateOrCreate": false, "useWebpackRequire": true };

    let rg = new RouteGenerator(routeName, configCustom);

    rg.buildRoute();

    var componentFile = fse.readFileSync(configCustom.getRoutesRoot() + '/' + routeName.toLowerCase() + path.sep + `${routeName.toLowerCase()}.component.ts`, 'utf8');
    expect(componentFile, '[componentFile]').to.not.have.string(`public templateUrl: string;`);
    expect(componentFile, '[componentFile]').to.not.have.string(`this.templateUrl = '${routeName.toLowerCase()}.template.html';`);
    expect(componentFile, '[componentFile]').to.have.string(`public template: string;`);
    expect(componentFile, '[componentFile]').to.have.string(`this.template = require('./${routeName.toLowerCase()}.template.html');`);
  });

  afterEach(function () {
    fse.removeSync('./src');
  });

});

function checkIfDirectoriesExists(pathToCheck) {
  fse.statSync(pathToCheck);
}

function chekIfFilesExistsAndAreCorrects(pathToCheck) {
  var componentFile = fse.readFileSync(pathToCheck + path.sep + `${routeName.toLowerCase()}.component.ts`, 'utf8');
  expect(componentFile, '[componentFile]').to.have.string(`import { ${capitalizedRouteName}Controller } from './${routeName.toLowerCase()}.controller';`);
  expect(componentFile, '[componentFile]').to.have.string(`export class ${capitalizedRouteName}Component`);
  expect(componentFile, '[componentFile]').to.have.string(`this.templateUrl = '${routeName.toLowerCase()}.template.html';`);

  var controllerFile = fse.readFileSync(pathToCheck + path.sep + `${routeName.toLowerCase()}.controller.ts`, 'utf8');
  expect(controllerFile, '[controllerFile]').to.have.string(`export class ${capitalizedRouteName}Controller`);

  var moduleFile = fse.readFileSync(pathToCheck + path.sep + `${routeName.toLowerCase()}.module.ts`, 'utf8');
  expect(moduleFile, '[moduleFile]').to.have.string(`export let ${capitalizedRouteName}Module`);
  expect(moduleFile, '[moduleFile]').to.have.string(`.config(${capitalizedRouteName}Route);`);
  expect(moduleFile, '[moduleFile]').to.have.string(` = module('${routeName.toLowerCase()}', [])`);
  expect(moduleFile, '[moduleFile]').to.have.string(`.component('${routeName.toLowerCase()}', new ${capitalizedRouteName}Component())`);

  var routeFile = fse.readFileSync(pathToCheck + path.sep + `${routeName.toLowerCase()}.route.ts`, 'utf8');
  expect(routeFile, '[routeFile]').to.have.string(`export function ${capitalizedRouteName}Route`);
  expect(routeFile, '[routeFile]').to.have.string(`.when('/${routeName.toLowerCase()}', {`);
  expect(routeFile, '[routeFile]').to.have.string(`template: '<${routeName.toLowerCase()}></${routeName.toLowerCase()}>'`);
}

function checkIfRootIndexIsCorrectlyCreated() {
  var indexFile = fse.readFileSync(path.join(config.getRoutesRoot(), 'index.ts'), 'utf8');
  expect(indexFile).to.have.string(`import { ${capitalizedRouteName}Module } from './${routeName.toLowerCase()}/${routeName.toLowerCase()}.module';`);
}

function checkIfRootIndexIsCorrectlyCreatedWithPathAlteration() {
  var indexFile = fse.readFileSync(path.join(config.getRoutesRoot(), 'index.ts'), 'utf8');
  expect(indexFile).to.have.string(`import { ${capitalizedRouteName}Module } from './down/${routeName.toLowerCase()}/${routeName.toLowerCase()}.module';`);
}

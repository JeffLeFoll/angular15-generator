'use strict';

let path = require('path');
let fse = require('fs-extra');
let expect = require('chai').expect
let ConfigResolver = require('./configResolver');
let RouteGenerator = require('./routeGenerator');

const config = new ConfigResolver();
const routeName = 'login';
const testPath = path.join(config.getRoutesRoot(), routeName);

describe('RouteGenerator functionalities', function () {

  before(function () {
  });

  it('should create the folder structure for the new route when initialized', function () {

    new RouteGenerator(routeName, config);

    checkIfDirectoriesExists();
  });

  it('should create all the files needed for the new route', function () {
    var rg = new RouteGenerator(routeName, config);

    rg._createNewFiles();

    chekIfFilesExistsAndAreCorrects();
  });

  after(function () {
    fse.removeSync('./src/app');
  });

});


function checkIfDirectoriesExists() {
  var check = false;
  try {
    fse.accessSync(testPath, fse.F_OK);
    check = true;
  } catch (e) {
    check = false;
  }

  expect(check).to.be.true;
}

function chekIfFilesExistsAndAreCorrects() {
  var componentFile = fse.readFileSync(testPath + path.sep + `${routeName}.component.ts`, 'utf8');
  expect(componentFile, '[componentFile]').to.have.string(`export class ${routeName}Component`);

  var controllerFile = fse.readFileSync(testPath + path.sep + `${routeName}.controller.ts`, 'utf8');
  expect(controllerFile, '[controllerFile]').to.have.string(`export class ${routeName}Controller`);

  var moduleFile = fse.readFileSync(testPath + path.sep + `${routeName}.module.ts`, 'utf8');
  expect(moduleFile, '[moduleFile]').to.have.string(`export let ${routeName}Module`);
  expect(moduleFile, '[moduleFile]').to.have.string(`.config(${routeName}Route);`);

  var routeFile = fse.readFileSync(testPath + path.sep + `${routeName}.route.ts`, 'utf8');
  expect(routeFile, '[routeFile]').to.have.string(`export function ${routeName}Route`);

}

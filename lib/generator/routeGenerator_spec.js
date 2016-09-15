'use strict';

let path = require('path');
let fse = require('fs-extra');
let expect = require('chai').expect
let ConfigResolver = require('./configResolver');
let RouteGenerator = require('./routeGenerator');

const routeName = 'oAuth';
const capitalizedRouteName = 'OAuth';
const config = new ConfigResolver();
const testPath = path.join(config.getRoutesRoot(), routeName.toLowerCase());

describe('RouteGenerator functionalities', function () {

  before(function () {
  });

  it('should create the folder structure for the new route when initialized', function () {

    new RouteGenerator(routeName, config);

    checkIfDirectoriesExists();
  });

  it('should create all the files needed for the new route', function () {
    var rg = new RouteGenerator(routeName, config);

    rg.buildRoute();

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
  var componentFile = fse.readFileSync(testPath + path.sep + `${routeName.toLowerCase()}.component.ts`, 'utf8');
  expect(componentFile, '[componentFile]').to.have.string(`import { ${capitalizedRouteName}Controller } from './${routeName.toLowerCase()}.controller';`);
  expect(componentFile, '[componentFile]').to.have.string(`export class ${capitalizedRouteName}Component`);
  expect(componentFile, '[componentFile]').to.have.string(`this.templateUrl = '${routeName.toLowerCase()}.template.html';`);

  var controllerFile = fse.readFileSync(testPath + path.sep + `${routeName.toLowerCase()}.controller.ts`, 'utf8');
  expect(controllerFile, '[controllerFile]').to.have.string(`export class ${capitalizedRouteName}Controller`);

  var moduleFile = fse.readFileSync(testPath + path.sep + `${routeName.toLowerCase()}.module.ts`, 'utf8');
  expect(moduleFile, '[moduleFile]').to.have.string(`export let ${capitalizedRouteName}Module`);
  expect(moduleFile, '[moduleFile]').to.have.string(`.config(${capitalizedRouteName}Route);`);
  expect(moduleFile, '[moduleFile]').to.have.string(` = module('${routeName.toLowerCase()}', [])`);
  expect(moduleFile, '[moduleFile]').to.have.string(`.component('${routeName.toLowerCase()}', new ${capitalizedRouteName}Component())`);

  var routeFile = fse.readFileSync(testPath + path.sep + `${routeName.toLowerCase()}.route.ts`, 'utf8');
  expect(routeFile, '[routeFile]').to.have.string(`export function ${capitalizedRouteName}Route`);
  expect(routeFile, '[routeFile]').to.have.string(`.when('/${routeName.toLowerCase()}', {`);
  expect(routeFile, '[routeFile]').to.have.string(`template: '<${routeName.toLowerCase()}></${routeName.toLowerCase()}>'`);

}

'use strict';

let path = require('path');
let fse = require('fs-extra');
let expect = require('chai').expect;
let ConfigResolver = require('./configResolver');
let ComponentGenerator = require('./componentGenerator');

const config = new ConfigResolver();
const componentName = 'userlist';
const testPath = path.join(config.getComponentsRoot(), componentName);

describe('ComponentGenerator functionalities', function () {

  before(function () {
  });

  it('should create the folder structure for the new component when initialized', function () {

    new ComponentGenerator(componentName, config);

    checkIfDirectoriesExists(componentName);
  });

  it('should create all the files needed for the new component', function () {
    var cg = new ComponentGenerator(componentName, config);

    cg._createNewFiles();

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
  var componentFile = fse.readFileSync(testPath + path.sep + `${componentName}.component.ts`, 'utf8');
  expect(componentFile, '[componentFile]').to.have.string(`export class ${componentName}Component`);

  var controllerFile = fse.readFileSync(testPath + path.sep + `${componentName}.controller.ts`, 'utf8');
  expect(controllerFile, '[controllerFile]').to.have.string(`export class ${componentName}Controller`);

  var moduleFile = fse.readFileSync(testPath + path.sep + `${componentName}.module.ts`, 'utf8');
  expect(moduleFile, '[moduleFile]').to.have.string(`export let ${componentName}Module`);
  expect(moduleFile, '[moduleFile]').to.not.have.string(`.config(${componentName}Route);`);
}
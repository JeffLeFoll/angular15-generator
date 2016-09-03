'use strict';

let path = require('path');
let fse = require('fs-extra');
let expect = require('chai').expect;
const ComponentGenerator = require('./componentGenerator');

const componentName = 'userlist';
const testPath = path.join('src', 'ts', 'app', 'components', componentName);

describe('ComponentGenerator functionalities', function () {

  before(function () {
  });

  it('should create the folder structure for the new component when initialized', function () {

    new ComponentGenerator(componentName);

    checkIfDirectoriesExists(componentName);
  });

  it('should create all the files needed for the new component', function () {
    var cg = new ComponentGenerator(componentName);

    cg._createNewFiles();

    chekIfFilesExistsAndAreCorrects();
  });


  after(function () {
    fse.removeSync('./src/ts');
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
  expect(moduleFile, '[moduleFile]').to.have.string(`export class ${componentName}Module`);
}
'use strict';

let path = require('path');
let fse = require('fs-extra');
let expect = require('chai').expect;
let ConfigResolver = require('./configResolver');
let ComponentGenerator = require('./componentGenerator');

const componentName = 'userlist';
const capitalizedComponentName = 'Userlist';
const config = new ConfigResolver();
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

    cg.buildComponent();

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
  expect(componentFile, '[componentFile]').to.have.string(`import {${capitalizedComponentName}Controller} from './${componentName}.controller';`);
  expect(componentFile, '[componentFile]').to.have.string(`export class ${capitalizedComponentName}Component`);

  var controllerFile = fse.readFileSync(testPath + path.sep + `${componentName}.controller.ts`, 'utf8');
  expect(controllerFile, '[controllerFile]').to.have.string(`export class ${capitalizedComponentName}Controller`);

  var moduleFile = fse.readFileSync(testPath + path.sep + `${componentName}.module.ts`, 'utf8');
  expect(moduleFile, '[moduleFile]').to.have.string(`export let ${capitalizedComponentName}Module`);
  expect(moduleFile, '[moduleFile]').to.not.have.string(`.config(${capitalizedComponentName}Route);`);
}
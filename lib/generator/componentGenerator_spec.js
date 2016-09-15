'use strict';

let path = require('path');
let fse = require('fs-extra');
let expect = require('chai').expect;
let ConfigResolver = require('./configResolver');
let ComponentGenerator = require('./componentGenerator');

const componentName = 'userList';
const capitalizedComponentName = 'UserList';
const config = new ConfigResolver();
const testPath = path.join(config.getComponentsRoot(), componentName.toLowerCase());

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

  it("should create the component rot index if it doesn't exist", function () {
    var cg = new ComponentGenerator(componentName, config);

  });

  it("should update the component rot index if it doesn't exist", function () {
    var cg = new ComponentGenerator(componentName, config);

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
  var componentFile = fse.readFileSync(testPath + path.sep + `${componentName.toLowerCase()}.component.ts`, 'utf8');
  expect(componentFile, '[componentFile]').to.have.string(`import {${capitalizedComponentName}Controller} from './${componentName.toLowerCase()}.controller';`);
  expect(componentFile, '[componentFile]').to.have.string(`export class ${capitalizedComponentName}Component`);
  expect(componentFile, '[componentFile]').to.have.string(`    this.templateUrl = "${componentName.toLowerCase()}.template.html";`);

  var controllerFile = fse.readFileSync(testPath + path.sep + `${componentName.toLowerCase()}.controller.ts`, 'utf8');
  expect(controllerFile, '[controllerFile]').to.have.string(`export class ${capitalizedComponentName}Controller`);

  var moduleFile = fse.readFileSync(testPath + path.sep + `${componentName.toLowerCase()}.module.ts`, 'utf8');
  expect(moduleFile, '[moduleFile]').to.have.string(`export let ${capitalizedComponentName}Module`);
  expect(moduleFile, '[moduleFile]').to.have.string(` = module('${componentName.toLowerCase()}', [])`);
  expect(moduleFile, '[moduleFile]').to.have.string(`.component('${componentName.toLowerCase()}', new ${capitalizedComponentName}Component())`);
  expect(moduleFile, '[moduleFile]').to.not.have.string(`.config(${capitalizedComponentName}Route);`);
}
'use strict';

let expect = require('chai').expect;
let path = require('path');
let fse = require('fs-extra');

let ConfigResolver = require('./configResolver');
let ComponentGenerator = require('./componentGenerator');
let RootIndexGenerator = require('./rootIndexGenerator');

const componentName = 'userList';
const capitalizedComponentName = 'UserList';
const config = new ConfigResolver();
const testPath = path.join(config.getComponentsRoot(), componentName.toLowerCase());

describe('ComponentGenerator functionalities', function () {

  it('should create the folder structure for the new component when initialized', function () {

    new ComponentGenerator(componentName, config);

    checkIfDirectoriesExists(testPath);
  });

  it('should create all the files needed for the new component', function () {
    let cg = new ComponentGenerator(componentName, config);

    cg.buildComponent();

    checkIfComponentsFilesExistsAndAreCorrects(testPath);
  });

  it('should write the root index file', function () {
    let rootIndexGenerator = new RootIndexGenerator(componentName);
    let cg = new ComponentGenerator(componentName, config, rootIndexGenerator);

    cg.updateOrCreateRootModule(true);

    checkIfRootIndexIsCorrectlyCreated();
  });


  it('should create the folder structure with path alteration (foldr up)', function () {

    new ComponentGenerator('../cmpup/' + componentName, config);

    checkIfDirectoriesExists('src/app/cmpup');
  });

  it('should create the folder structure with path alteration (folder down)', function () {

    new ComponentGenerator('down/' + componentName, config);

    checkIfDirectoriesExists('src/app/components/down');
  });


  it('should create all the files needed for the new route even with path alteration', function () {
    let cg = new ComponentGenerator('down/' + componentName, config);

    cg.buildComponent();

    checkIfComponentsFilesExistsAndAreCorrects('src/app/components/down' + '/' + componentName.toLowerCase());
  });

  it('should write the root index file with path alteration', function () {

    let rootIndexGenerator = new RootIndexGenerator('../upward/' + componentName);
    let rg = new ComponentGenerator('../upward/' + componentName, config, rootIndexGenerator);

    rg.updateOrCreateRootModule(true);

    checkIfRootIndexIsCorrectlyCreatedWithPathAlteration();
  });

  it('should use the webpack require when specified in the config file', function () {
    let configCustom = new ConfigResolver();
    configCustom.customConfig = {
      "componentsRoot": "src/app/components",
      "routesRoot": "src/rts",
      "componentsRootModuleName": "cmp.ts",
      "routesRootModuleName": "rts.ts",
      "updateOrCreate": false,
      "useWebpackRequire": true
    };

    let cg = new ComponentGenerator(componentName, configCustom);

    cg.buildComponent();

    let componentFile = fse.readFileSync(configCustom.getComponentsRoot() + '/' + componentName.toLowerCase() + path.sep + `${componentName.toLowerCase()}.component.ts`, 'utf8');
    expect(componentFile, '[componentFile]').to.not.have.string(`public templateUrl: string;`);
    expect(componentFile, '[componentFile]').to.not.have.string(`this.templateUrl = '${componentName.toLowerCase()}.template.html';`);
    expect(componentFile, '[componentFile]').to.have.string(`public template: string;`);
    expect(componentFile, '[componentFile]').to.have.string(`this.template = require('./${componentName.toLowerCase()}.template.html');`);
  });

  afterEach(function () {
    fse.removeSync('./src');
  });

});

function checkIfDirectoriesExists(pathToCheck) {
  fse.statSync(pathToCheck);
}

function checkIfComponentsFilesExistsAndAreCorrects(pathToCheck) {
  let componentFile = fse.readFileSync(pathToCheck + path.sep + `${componentName.toLowerCase()}.component.ts`, 'utf8');
  expect(componentFile, '[componentFile]').to.have.string(`import { ${capitalizedComponentName}Controller } from './${componentName.toLowerCase()}.controller';`);
  expect(componentFile, '[componentFile]').to.have.string(`export class ${capitalizedComponentName}Component`);
  expect(componentFile, '[componentFile]').to.have.string(`this.templateUrl = '${componentName.toLowerCase()}.template.html';`);

  let controllerFile = fse.readFileSync(pathToCheck + path.sep + `${componentName.toLowerCase()}.controller.ts`, 'utf8');
  expect(controllerFile, '[controllerFile]').to.have.string(`export class ${capitalizedComponentName}Controller`);

  let moduleFile = fse.readFileSync(pathToCheck + path.sep + `${componentName.toLowerCase()}.module.ts`, 'utf8');
  expect(moduleFile, '[moduleFile]').to.have.string(`export let ${capitalizedComponentName}Module`);
  expect(moduleFile, '[moduleFile]').to.have.string(`module('${componentName.toLowerCase()}', [])`);
  expect(moduleFile, '[moduleFile]').to.have.string(`.component('${componentName.toLowerCase()}', new ${capitalizedComponentName}Component())`);
  expect(moduleFile, '[moduleFile]').to.not.have.string(`.config(${capitalizedComponentName}Route);`);

  let htmlFile = fse.readFileSync(pathToCheck + path.sep + `${componentName.toLowerCase()}.template.html`, 'utf8');
  expect(htmlFile, '[htmlFile]').to.have.string(`Hello from ${capitalizedComponentName} !`);
}

function checkIfRootIndexIsCorrectlyCreated() {
  let indexFile = fse.readFileSync(path.join(config.getComponentsRoot(), 'index.ts'), 'utf8');

  expect(indexFile).to.have.string(`import { ${capitalizedComponentName}Module } from './${componentName.toLowerCase()}/${componentName.toLowerCase()}.module';`);
}


function checkIfRootIndexIsCorrectlyCreatedWithPathAlteration() {
  let indexFile = fse.readFileSync(path.join(config.getComponentsRoot(), 'index.ts'), 'utf8');

  expect(indexFile).to.have.string(`import { ${capitalizedComponentName}Module } from '../upward/${componentName.toLowerCase()}/${componentName.toLowerCase()}.module';`);
}

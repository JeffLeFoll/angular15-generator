'use strict';

let expect = require('chai').expect;
let path = require('path');
let fse = require('fs-extra');

let ConfigResolver = require('./configResolver');
let FilterGenerator = require('./filterGenerator');
let RootIndexGenerator = require('./rootIndexGenerator');

const filterName = 'userList';
const capitalizedFilterName = 'UserList';
const config = new ConfigResolver();
const testPath = path.join(config.getFiltersRoot(), filterName.toLowerCase());

describe('FilterGenerator functionalities', function () {

  it('should create the folder structure for the new filter when initialized', function () {

    new FilterGenerator(filterName, config);

    checkIfDirectoriesExists(testPath);
  });

  it('should create all the files needed for the new filter', function () {
    let cg = new FilterGenerator(filterName, config);

    cg.buildFilter();

    checkIfFiltersFilesExistsAndAreCorrects(testPath);
  });

  it('should write the root index file', function () {
    let rootIndexGenerator = new RootIndexGenerator(filterName);
    let cg = new FilterGenerator(filterName, config, rootIndexGenerator);

    cg.updateOrCreateRootModule(true);

    checkIfRootIndexIsCorrectlyCreated();
  });


  it('should create the folder structure with path alteration (foldr up)', function () {

    new FilterGenerator('../cmpup/' + filterName, config);

    checkIfDirectoriesExists('src/app/cmpup');
  });

  it('should create the folder structure with path alteration (folder down)', function () {

    new FilterGenerator('down/' + filterName, config);

    checkIfDirectoriesExists('src/app/filters/down');
  });


  it('should create all the files needed for the new route even with path alteration', function () {
    let cg = new FilterGenerator('down/' + filterName, config);

    cg.buildFilter();

    checkIfFiltersFilesExistsAndAreCorrects('src/app/filters/down' + '/' + filterName.toLowerCase());
  });

  it('should write the root index file with path alteration', function () {

    let rootIndexGenerator = new RootIndexGenerator('../upward/' + filterName);
    let rg = new FilterGenerator('../upward/' + filterName, config, rootIndexGenerator);

    rg.updateOrCreateRootModule(true);

    checkIfRootIndexIsCorrectlyCreatedWithPathAlteration();
  });

  afterEach(function () {
    fse.removeSync('./src');
  });

});

function checkIfDirectoriesExists(pathToCheck) {
  fse.statSync(pathToCheck);
}

function checkIfFiltersFilesExistsAndAreCorrects(pathToCheck) {
  let filterFile = fse.readFileSync(pathToCheck + path.sep + `${filterName.toLowerCase()}.filter.ts`, 'utf8');
  expect(filterFile, '[filterFile]').to.have.string(`${filterName.toLowerCase()}.$inject = [];`);
  expect(filterFile, '[filterFile]').to.have.string(`export function ${filterName.toLowerCase()}() : Function {`);

  let filterInterfaceFile = fse.readFileSync(pathToCheck + path.sep + `${filterName.toLowerCase()}.filter_spec.ts`, 'utf8');
  expect(filterInterfaceFile, '[filterInterfaceFile]').to.have.string(`import { ${filterName.toLowerCase()} } from './${filterName.toLowerCase()}';`);
  expect(filterInterfaceFile, '[filterInterfaceFile]').to.have.string(`const filter = ${filterName.toLowerCase()}();`);
  expect(filterInterfaceFile, '[filterInterfaceFile]').to.have.string(`describe('${filterName.toLowerCase()} Filter Spec', () => {`);
}

function checkIfRootIndexIsCorrectlyCreated() {
  let indexFile = fse.readFileSync(path.join(config.getFiltersRoot(), 'index.ts'), 'utf8');

  expect(indexFile).to.have.string(`import { ${filterName.toLowerCase()} } from './${filterName.toLowerCase()}/${filterName.toLowerCase()}.filter';`);
}


function checkIfRootIndexIsCorrectlyCreatedWithPathAlteration() {
  let indexFile = fse.readFileSync(path.join(config.getFiltersRoot(), 'index.ts'), 'utf8');

  expect(indexFile).to.have.string(`import { ${filterName.toLowerCase()} } from '../upward/${filterName.toLowerCase()}/${filterName.toLowerCase()}.filter';`);
}

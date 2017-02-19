'use strict';

let expect = require('chai').expect;
let path = require('path');
let fse = require('fs-extra');

let ConfigResolver = require('./configResolver');
let ServiceGenerator = require('./serviceGenerator');
let RootIndexGenerator = require('./rootIndexGenerator');

const serviceName = 'userList';
const capitalizedServiceName = 'UserList';
const config = new ConfigResolver();
const testPath = path.join(config.getServicesRoot(), serviceName.toLowerCase());

describe('ServiceGenerator functionalities', function () {

    it('should create the folder structure for the new service when initialized', function () {

        new ServiceGenerator(serviceName, config);

        checkIfDirectoriesExists(testPath);
    });

    it('should create all the files needed for the new service', function () {
        let cg = new ServiceGenerator(serviceName, config);

        cg.buildService();

        checkIfServicesFilesExistsAndAreCorrects(testPath);
    });

    it('should write the root index file', function () {
        let rootIndexGenerator = new RootIndexGenerator(serviceName);
        let cg = new ServiceGenerator(serviceName, config, rootIndexGenerator);

        cg.updateOrCreateRootModule(true);

        checkIfRootIndexIsCorrectlyCreated();
    });


    it('should create the folder structure with path alteration (foldr up)', function () {

        new ServiceGenerator('../cmpup/' + serviceName, config);

        checkIfDirectoriesExists('src/app/cmpup');
    });

    it('should create the folder structure with path alteration (folder down)', function () {

        new ServiceGenerator('down/' + serviceName, config);

        checkIfDirectoriesExists('src/app/services/down');
    });


    it('should create all the files needed for the new route even with path alteration', function () {
        let cg = new ServiceGenerator('down/' + serviceName, config);

        cg.buildService();

        checkIfServicesFilesExistsAndAreCorrects('src/app/services/down' + '/' + serviceName.toLowerCase());
    });

    it('should write the root index file with path alteration', function () {

        let rootIndexGenerator = new RootIndexGenerator('../upward/' + serviceName);
        let rg = new ServiceGenerator('../upward/' + serviceName, config, rootIndexGenerator);

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

function checkIfServicesFilesExistsAndAreCorrects(pathToCheck) {
    let serviceFile = fse.readFileSync(pathToCheck + path.sep + `${serviceName.toLowerCase()}.service.ts`, 'utf8');
    expect(serviceFile, '[serviceFile]').to.have.string(`import { I${capitalizedServiceName}Service } from './${serviceName.toLowerCase()}.service.interface';`);
    expect(serviceFile, '[serviceFile]').to.have.string(`export class ${capitalizedServiceName}Service implements I${capitalizedServiceName}Service {`);
    expect(serviceFile, '[serviceFile]').to.have.string(`static $inject = [];`);

    let serviceInterfaceFile = fse.readFileSync(pathToCheck + path.sep + `${serviceName.toLowerCase()}.service.interface.ts`, 'utf8');
    expect(serviceInterfaceFile, '[serviceInterfaceFile]').to.have.string(`export interface I${capitalizedServiceName}Service`);
}

function checkIfRootIndexIsCorrectlyCreated() {
    let indexFile = fse.readFileSync(path.join(config.getServicesRoot(), 'index.ts'), 'utf8');

    expect(indexFile).to.have.string(`import { ${capitalizedServiceName}Module } from './${serviceName.toLowerCase()}/${serviceName.toLowerCase()}.module';`);
}


function checkIfRootIndexIsCorrectlyCreatedWithPathAlteration() {
    let indexFile = fse.readFileSync(path.join(config.getServicesRoot(), 'index.ts'), 'utf8');

    expect(indexFile).to.have.string(`import { ${capitalizedServiceName}Module } from '../upward/${serviceName.toLowerCase()}/${serviceName.toLowerCase()}.module';`);
}

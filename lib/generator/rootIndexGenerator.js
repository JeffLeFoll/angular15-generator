'use strict';

let fse = require('fs-extra');
let path = require('path');
let StringUtil = require('../utils/stringUtil');
let PathUtil = require('../utils/pathUtil');
let rootIndexTplt = require('./templates/component/root_index').rootIndex;

class RootIndexGenerator {

  constructor(name) {
    let nameWithoutPath = PathUtil.stripPathIfPResent(name);
    this.capitalizedName = StringUtil.capitalizeFirstLetter(nameWithoutPath);
    this.lowerCaseName = nameWithoutPath.toLowerCase();
    this.pathPrefix = PathUtil.getPathDir(name);
  }

  getRootFileDataWithNewModule(rootPath, rootModuleName) {
    let fileData = this._getRootIndex(rootPath, rootModuleName);

    let fileDataWithImport = this._addModuleImportToFileData(fileData);

    return this._addNewModuleName(fileDataWithImport);
  }

  getRootFileDataWithNewService(rootPath, rootModuleName) {
    let fileData = this._getRootIndex(rootPath, rootModuleName);

    let fileDataWithImport = this._addServiceImportToFileData(fileData);

    return this._addNewService(fileDataWithImport);
  }

  getRootFileDataWithNewFilter (rootPath, rootModuleName) {
    let fileData = this._getRootIndex(rootPath, rootModuleName);

    let fileDataWithImport = this._addFilterImportToFileData(fileData);

    return this._addNewFilter(fileDataWithImport);
  }


  _getRootIndex(rootPath, rootModuleName) {
    let fullPath = path.join(rootPath, rootModuleName);

    let data = '';
    try {
      data = fse.readFileSync(fullPath, 'utf8');

    } catch (err) {
      let index = rootPath.lastIndexOf('/') + 1;
      data = rootIndexTplt(rootPath.slice(index));

      fse.ensureDirSync(rootPath);
      fse.writeFileSync(fullPath, data);
    }
    return data;
  }

  _addModuleImportToFileData(fileData) {
    let angularImport = 'import { module } from \'angular\';';
    let importToAdd = `$&\nimport { ${this.capitalizedName}Module } from '${this.pathPrefix}/${this.lowerCaseName}/${this.lowerCaseName}.module';`;

    return fileData.replace(angularImport, importToAdd);
  }

  _addServiceImportToFileData(fileData) {
    let angularImport = 'import { module } from \'angular\';';
    let importToAdd = `$&\nimport { ${this.capitalizedName}Service } from '${this.pathPrefix}/${this.lowerCaseName}/${this.lowerCaseName}.service';`;

    return fileData.replace(angularImport, importToAdd);
  }

  _addFilterImportToFileData(fileData) {
    let angularImport = 'import { module } from \'angular\';';
    let importToAdd = `$&\nimport { ${this.lowerCaseName} } from '${this.pathPrefix}/${this.lowerCaseName}/${this.lowerCaseName}.filter';`;

    return fileData.replace(angularImport, importToAdd);
  }

  _addNewModuleName(fileDataWithImport) {
    let moduleNameToAdd = `${this.capitalizedName}Module.name$&`;

    if (fileDataWithImport.search('.name') != -1) {
      return fileDataWithImport.replace(']);', ', ' + moduleNameToAdd);
    }
    return fileDataWithImport.replace(']);', moduleNameToAdd);
  }

  _addNewService(fileDataWithImport) {
    let serviceName = `${this.capitalizedName}Service`;
    let serviceToAdd = `$&\n.service('${serviceName}', ${serviceName})`;

    return fileDataWithImport.replace('])', serviceToAdd);
  }

  _addNewFilter(fileDataWithImport) {
    let filterToAdd = `$&\n.filter('${this.lowerCaseName}', ${this.lowerCaseName})`;

    return fileDataWithImport.replace('])', filterToAdd);
  }

}

module.exports = RootIndexGenerator;

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

  getRootModuleFileData(rootPath, rootModuleName) {
    let fileData = this._getRootIndex(rootPath, rootModuleName);

    let fileDataWithImport = this._addImportToFileData(fileData);

    return this._addNewModuleName(fileDataWithImport);
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

  _addImportToFileData(fileData) {
    let angularImport = 'import { module } from \'angular\';';
    let importToAdd = `$&\nimport { ${this.capitalizedName}Module } from '${this.pathPrefix}/${this.lowerCaseName}/${this.lowerCaseName}.module';`;

    return fileData.replace(angularImport, importToAdd);
  }

  _addNewModuleName(fileDataWithImport) {
    let moduleNameToAdd = `${this.capitalizedName}Module.name$&`;

    if (fileDataWithImport.search('.name') != -1) {
      return fileDataWithImport.replace(']);', ', ' + moduleNameToAdd);
    }
    return fileDataWithImport.replace(']);', moduleNameToAdd);
  }

}

module.exports = RootIndexGenerator;

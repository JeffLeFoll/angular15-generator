'use strict';

class RootIndexGenerator {

  constructor(name) {
    this.capitalizedName = name;
    this.lowerCaseName = name.toLowerCase()
  }

  addImportToFileData(fileData) {
    let angularImport = "import { module } from 'angular';";
    let importToAdd = `$&\nimport { ${this.capitalizedName}Module } from './${this.lowerCaseName}/${this.lowerCaseName}.module.ts';`;

    return fileData.replace(angularImport, importToAdd);
  }

  addNewModuleName(fileDataWithImport) {
    let moduleNameToAdd = `${this.capitalizedName}Module.name$&`;

    if(fileDataWithImport.search('.name') != -1) {
      return fileDataWithImport.replace(']);', ', ' + moduleNameToAdd);
    }
    return fileDataWithImport.replace(']);', moduleNameToAdd);
  }

}

module.exports = RootIndexGenerator;
'use strict';

exports.componentTemplate = function (capitalizedName, lowerCaseName, useWebpackRequire) {

  return `
import { ${capitalizedName}Controller } from './${lowerCaseName}.controller';

export class ${capitalizedName}Component implements ng.IComponentOptions {
  public bindings: any;
  public controller: any;
  public controllerAs: any;
  ${getTemplateDeclaration(useWebpackRequire)}

  constructor() {
    this.bindings = {};
    this.controller = ${capitalizedName}Controller;
    this.controllerAs = '$ctrl';
    ${getTemplateInfo(lowerCaseName, useWebpackRequire)}
  }
}
`

};

function getTemplateDeclaration(useWebpackRequire) {
  if(useWebpackRequire) {
    return 'public template: string;';
  }
  return 'public templateUrl: string;';
}

function getTemplateInfo(lowerCaseName, useWebpackRequire) {
  if(useWebpackRequire) {
    return `this.template = require('./${lowerCaseName}.template.html');`;
  }
  return `this.templateUrl = '${lowerCaseName}.template.html';`;
}



'use strict';

exports.componentTemplate = function (capitalizedName, lowerCaseName) {

  return `
import { ${capitalizedName}Controller } from './${lowerCaseName}.controller';

export class ${capitalizedName}Component implements ng.IComponentOptions {
  public bindings: any;
  public controller: any;
  public controllerAs: any;
  public templateUrl: string;

  constructor() {
    this.bindings = {};
    this.controller = ${capitalizedName}Controller;
    this.controllerAs = '$ctrl';
    this.templateUrl = '${lowerCaseName}.template.html';
  }
}
`

};



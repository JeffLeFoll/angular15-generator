'use strict';

let StringUtil = require('../../../utils/stringUtil');

exports.componentTemplate = function (name) {

  let capitalizedName = StringUtil.capitalizeFirstLetter(name);

  return `
import {${capitalizedName}Controller} from './${name}.controller';

export class ${capitalizedName}Component implements ng.IComponentOptions {
  public bindings: any;
  public controller: any;
  public templateUrl: string;

  constructor() {
    this.bindings = {};
    this.controller = ${capitalizedName}Controller;
    this.templateUrl = "${name}.template.html";
  }
}
`

};



'use strict';

exports.componentTemplate = function (name) {

  return `

import {${name}Controller} from './${name}.controller';

export class ${name}Component implements ng.IComponentOptions {
  public bindings: any;
  public controller: any;
  public templateUrl: string;

  constructor() {
    this.bindings = {};
    this.controller = ${name}Controller;
    this.templateUrl = "${name}.template.html";
  }
}
`

};



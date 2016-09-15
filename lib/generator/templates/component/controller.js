'use strict';

exports.controllerTemplate = function (capitalizedName) {

  return `
export class ${capitalizedName}Controller implements ng.IComponentController {

    static $inject = [];

    constructor() {}

}
`

};
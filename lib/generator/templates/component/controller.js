'use strict';

exports.controllerTemplate = function (name) {

  return `

export class ${name}Controller implements ng.IComponentController {

    static $inject = [];

    constructor() {}

}
`

};
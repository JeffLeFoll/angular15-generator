'use strict';

let StringUtil = require('../../../utils/stringUtil');

exports.controllerTemplate = function (name) {

  let capitalizedName = StringUtil.capitalizeFirstLetter(name);

  return `
export class ${capitalizedName}Controller implements ng.IComponentController {

    static $inject = [];

    constructor() {}

}
`

};
'use strict';

let StringUtil = require('../../../utils/stringUtil');

exports.componentModuleTemplate = function (name) {

  let capitalizedName = StringUtil.capitalizeFirstLetter(name);

  return `
import {module} from 'angular';
import {${capitalizedName}Component} from './${name.toLowerCase()}.component';

export let ${capitalizedName}Module = module('${name.toLowerCase()}', [])
    .component('${name.toLowerCase()}', new ${capitalizedName}Component());
`
};
'use strict';

let StringUtil = require('../../../utils/stringUtil');

exports.componentModuleTemplate = function (name) {

  let capitalizedName = StringUtil.capitalizeFirstLetter(name);

  return `
import {module} from 'angular';
import {${capitalizedName}Component} from './${name}.component';

export let ${capitalizedName}Module = module('${name}', [])
    .component('${name}', new ${capitalizedName}Component());
`
};
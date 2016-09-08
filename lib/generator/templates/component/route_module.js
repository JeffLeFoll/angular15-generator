'use strict';

let StringUtil = require('../../../utils/stringUtil');

exports.routeModuleTemplate = function (name) {

  let capitalizedName = StringUtil.capitalizeFirstLetter(name);

  return `
import {module} from 'angular';
import {${capitalizedName}Component} from './${name}.component';
import {${capitalizedName}Route} from './${name}.route';

export let ${capitalizedName}Module = module('${name}', [])
    .component('${name}', new ${capitalizedName}Component())
    .config(${capitalizedName}Route);

`
};
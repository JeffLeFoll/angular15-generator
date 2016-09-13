'use strict';

let StringUtil = require('../../../utils/stringUtil');

exports.routeModuleTemplate = function (name) {

  let capitalizedName = StringUtil.capitalizeFirstLetter(name);

  return `
import {module} from 'angular';
import {${capitalizedName}Component} from './${name.toLowerCase()}.component';
import {${capitalizedName}Route} from './${name.toLowerCase()}.route';

export let ${capitalizedName}Module = module('${name.toLowerCase()}', [])
    .component('${name.toLowerCase()}', new ${capitalizedName}Component())
    .config(${capitalizedName}Route);

`
};
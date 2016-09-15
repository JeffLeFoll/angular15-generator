'use strict';

exports.componentModuleTemplate = function (capitalizedName, lowerCaseName) {

  return `
import { module } from 'angular';
import { ${capitalizedName}Component } from './${lowerCaseName}.component';

export let ${capitalizedName}Module = module('${lowerCaseName}', [])
    .component('${lowerCaseName}', new ${capitalizedName}Component());
`
};
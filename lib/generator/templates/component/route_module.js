'use strict';

exports.routeModuleTemplate = function (capitalizedName, lowerCaseName) {

  return `
import { module } from 'angular';
import { ${capitalizedName}Component } from './${lowerCaseName}.component';
import { ${capitalizedName}Route } from './${lowerCaseName}.route';

export let ${capitalizedName}Module = module('${lowerCaseName}', [])
    .component('${lowerCaseName}', new ${capitalizedName}Component())
    .config(${capitalizedName}Route);

`
};
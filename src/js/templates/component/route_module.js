'use strict';

exports.routeModuleTemplate = function (name) {

  return `

import {module} from 'angular';
import {${name}Component} from './${name}.component';
import {${name}Route} from './${name}.route';

export let ${name}Module = module('${name}', [])
    .component('${name}', new ${name}Component())
    .config(${name}Route);

`
};
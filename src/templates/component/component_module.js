'use strict';

exports.componentModuleTemplate = function (name) {

  return `

import {module} from 'angular';
import {${name}Component} from './${name}.component';

export let ${name}Module = module('${name}', [])
    .component('${name}', new ${name}Component());
`
};
'use strict';

exports.routeTemplate = function (name) {

  return `

import {${name}Component} from './${name}.component.ts';

export class ${name}Route {
    
    constructor() {}

}
`

};
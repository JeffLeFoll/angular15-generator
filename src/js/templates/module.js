'use strict';

exports.moduleTemplate = function (name) {

    return `

import {${name}Component} from './${name}.component.ts';

export class ${name}Module {
    
    constructor() {}

}
`

};
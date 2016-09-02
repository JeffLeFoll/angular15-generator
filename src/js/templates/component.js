'use strict';

exports.componentTemplate = function (name) {

    return `

import {${name}Controller} from './${name}.controller.ts';

export class ${name}Component {
    
    constructor() {}

}
`

};
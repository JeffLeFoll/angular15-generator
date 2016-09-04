'use strict';

exports.controllerTemplate = function (name) {

  return `

export class ${name}Controller {
    
    constructor() {}

}
`

};
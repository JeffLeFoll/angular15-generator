'use strict';

exports.serviceTemplate = function (capitalizedName, lowerCaseName) {

  return `
import { I${capitalizedName}Service } from './${lowerCaseName}.service.interface';

export class ${capitalizedName}Service implements I${capitalizedName}Service {

    static $inject = [];
    
    constructor() {
    }
    
    
}
`
};

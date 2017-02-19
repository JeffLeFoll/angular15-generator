'use strict';

exports.serviceInterfaceTemplate = function (capitalizedName) {

  return `
export interface I${capitalizedName}Service {

}
`
};
